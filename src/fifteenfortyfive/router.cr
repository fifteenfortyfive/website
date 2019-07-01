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
    get   "new",    to: "accounts#new",     helper: "new"
    post  "create", to: "accounts#create",  helper: "create"
    get   ":id",    to: "static#app_root",  helper: "show"

    scope do
      implements :authenticated
      get   "edit",   to: "accounts#edit",    helper: "edit"
      post  "update", to: "accounts#update",  helper: "update"
    end
  end

  scope "@me" do
    match "*", to: "static#app_root"
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

  scope "teams", helper_prefix: "teams" do
    root to: "teams#index"
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

    scope "v2" do
      get "/", to: "admin::V2::App#index"
    end
  end

  scope "api" do
    scope "v1" do
      use CORSHandler.new("/api/v1")

      scope "events" do
        get "/", to: "aPI::Events#index"
        get "/:event_id", to: "aPI::Events#get"

        scope ":event_id" do
          scope "teams" do
            get "/", to: "aPI::Teams#index"
            get "/:team_id", to: "aPI::Teams#get"
          end

          scope "run_submissions" do
            get "/", to: "aPI::RunSubmissions#index"
            get "/:run_submission_id", to: "aPI::RunSubmissions#get"
          end

          scope "runs" do
            get "/", to: "aPI::Runs#index"
            get "/:run_id", to: "aPI::Runs#get"
          end
        end
      end

      scope "accounts" do
        get "/", to: "aPI::Accounts#index"
        get "/:account_id", to: "aPI::Accounts#get"
      end

      scope "games" do
        get "/", to: "aPI::Games#index"
        get "/:game_id", to: "aPI::Games#get"
      end

      scope "teams" do
        get "/:team_id", to: "aPI::Teams#get"
      end

      scope "streams" do
        get "/", to: "aPI::Streams#index"
        get "/:account_id", to: "aPI::Streams#get"
      end

      scope "@me" do
        implements :authenticated

        get  "/", to: "API::MeController#get"
        post "/", to: "API::MeController#update_account"

        scope "account_preferences" do
          get  "/", to: "aPI::AccountPreferences#get"
          post "/", to: "aPI::AccountPreferences#update"
        end
      end
    end


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

    match "*", to: "aPI::Errors#not_found"
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


  match "*", to: "static#app_root"
end
