macro render_view(template)
  render "src/fifteenfortyfive/views/{{template.id}}.slang", "src/fifteenfortyfive/views/_layout.slang"
end


scope "/accounts" do
  get   "/new",     &->AccountsController._new(Krout::Env)
  post  "/create",  &->AccountsController.create(Krout::Env)
  get   "/edit",    &->AccountsController.edit(Krout::Env)
  post  "/update",  &->AccountsController.update(Krout::Env)
end



scope "/register" do
  get "", &->RegistrationsController.index(Krout::Env)
end

scope "/register/runner" do
  get  "",        &->RunnerSubmissionsController.show(Krout::Env)
  post "/submit", &->RunnerSubmissionsController.create(Krout::Env)
  post "/revoke", &->RunnerSubmissionsController.destroy(Krout::Env)
end

scope "/register/commentator" do
  get  "",        &->CommentatorSubmissionsController.show(Krout::Env)
  post "/submit", &->CommentatorSubmissionsController.create(Krout::Env)
  post "/revoke", &->CommentatorSubmissionsController.destroy(Krout::Env)
end

scope "/admin" do
  before_all do |env|
    unless env.current_user? && env.current_user.admin
      halt(env, status_code: 404, response: "Not Found")
    end
  end

  get "", &->AdminController.index(Krout::Env)

  get "/feature_flags", &->Admin::FeatureFlagsController.index(Krout::Env)
  get "/feature_flags/:flag_name/enable",  &->Admin::FeatureFlagsController.enable(Krout::Env)
  get "/feature_flags/:flag_name/disable", &->Admin::FeatureFlagsController.disable(Krout::Env)

  get "/accounts", &->Admin::AccountsController.index(Krout::Env)

  get "/submissions",         &->Admin::SubmissionsController.index(Krout::Env)
  get "/submissions/runners", &->Admin::SubmissionsController.runners(Krout::Env)
end


get "/", &->StaticController.index(Krout::Env)

get   "/signin",  &->SessionsController._new(Krout::Env)
post  "/signin",  &->SessionsController.create(Krout::Env)
get   "/signout", &->SessionsController.destroy(Krout::Env)
