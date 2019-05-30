require "orion"

router AppRouter do
  use HTTP::ErrorHandler
  use HTTP::LogHandler.new(STDOUT)
  use AnalyticsHandler
  use SessionHandler

  concern :authenticated do
    use AuthenticationHandler
  end

  concern :admin_authorized do
    implements :authenticated
    use AuthorizationHandler.new(required_level: :admin)
  end


  scope "accounts", helper_prefix: "user" do
    get   ":id",    to: "accounts#show",    helper: "show"
    get   "new",    to: "accounts#new",     helper: "new"
    post  "create", to: "accounts#create",  helper: "create"

    implements :authenticated
    get   "edit",   to: "accounts#edit",    helper: "edit"
    post  "update", to: "accounts#update",  helper: "update"
  end

  scope "events", helper_prefix: "events" do
    root to: "events#index"
    get  ":event_id",             to: "events#show",              helper: "show"

    implements :authenticated
    get  ":event_id/submit",       to: "run_submissions#new",     helper: "submit"
    post ":event_id/submit",       to: "run_submissions#create",  helper: "create"

    implements :admin_authorized
    get  ":event_id/submissions", to: "run_submissions#index",    helper: "run_submissions"
  end


  scope "admin", helper_prefix: "admin" do
    implements :admin_authorized

    scope "events", helper_prefix: "events" do
      root to: "admin::Events#index"
      get   "/:event_id",        to: "admin::Events#show",    helper: "show"
      get   "/new",              to: "admin::Events#new",     helper: "new"
      post  "/create",           to: "admin::Events#create",  helper: "create"
      get   "/:event_id/edit",   to: "admin::Events#edit",    helper: "edit"
      post  "/:event_id/update", to: "admin::Events#update",  helper: "update"

      get   "/:event_id/submissions", to: "admin::RunSubmissions#index",  helper: "submissions"
      get   "/:event_id/submissions/:submission_id/accept", to: "admin::RunSubmissions#accept",  helper: "submissions_accept"
      get   "/:event_id/submissions/:submission_id/unaccept", to: "admin::RunSubmissions#unaccept",  helper: "submissions_unaccept"
    end

    scope "users", helper_prefix: "users" do
      root to: "admin::Users#index"
    end
  end

  scope "api" do
    implements :authenticated

    scope "events" do
      get  "/:event_id/runner_submission", to: "aPI::Events#get_existing_submission"
      post "/:event_id/submit", to: "aPI::Events#submit"
    end

    scope "admin" do
      implements :admin_authorized
      scope "events" do
        get "/", to: "aPI::Admin#events"
        get "/:event_id/", to: "aPI::Admin#event"
      end

      scope "accounts" do
        get "/", to: "aPI::Admin#accounts"
      end

      scope "games" do
        get "/", to: "aPI::Admin#games"
      end
    end
  end


  root to: "static#index"
  get   "volunteer", to: "static#volunteer", helper: "static_volunteer"

  get   "signin",  to: "sessions#new", helper: "login"
  post  "signin",  to: "sessions#create", helper: "sessions_create"
  get   "signout", to: "sessions#destroy", helper: "logout"


  ## Static assets
  scope "css" do
    use HTTP::StaticFileHandler.new("public/", fallthrough: false, directory_listing: false)
  end
  scope "js" do
    use HTTP::StaticFileHandler.new("public/", fallthrough: false, directory_listing: false)
  end
end
