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


get "/", &->StaticController.index(Krout::Env)

get   "/signin",  &->SessionsController._new(Krout::Env)
post  "/signin",  &->SessionsController.create(Krout::Env)
get   "/signout", &->SessionsController.destroy(Krout::Env)
