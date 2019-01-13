macro render_view(template)
  render "src/fifteenfortyfive/views/{{template.id}}.slang", "src/fifteenfortyfive/views/_layout.slang"
end

scope "/accounts" do
  get   "/:id",     &->AccountsController.show(Krout::Env)
  get   "/new",     &->AccountsController._new(Krout::Env)
  post  "/create",  &->AccountsController.create(Krout::Env)
  get   "/edit",    &->AccountsController.edit(Krout::Env)
  post  "/update",  &->AccountsController.update(Krout::Env)
end

scope "/runs" do
  get  "/edit",   &->RunsController.edit(Krout::Env)
  post "/update", &->RunsController.update(Krout::Env)
end

scope "/events" do
  get "/", &->EventsController.index(Krout::Env)
  get "/:event_id", &->EventsController.show(Krout::Env)
end



scope "/admin" do
  before_all do |env|
    unless env.current_user? && env.current_user.admin
      halt(env, status_code: 404, response: "Not Found")
    end
  end

  get "", &->AdminController.index(Krout::Env)

  get  "/feature_flags",                    &->Admin::FeatureFlagsController.index(Krout::Env)
  post "/feature_flags/create",             &->Admin::FeatureFlagsController.create(Krout::Env)
  get  "/feature_flags/:flag_name/enable",  &->Admin::FeatureFlagsController.enable(Krout::Env)
  get  "/feature_flags/:flag_name/disable", &->Admin::FeatureFlagsController.disable(Krout::Env)

  get "/accounts", &->Admin::AccountsController.index(Krout::Env)

  get "/submissions",         &->Admin::SubmissionsController.index(Krout::Env)
  get "/submissions/runners", &->Admin::SubmissionsController.runners(Krout::Env)
  get "/submissions/export",          &->Admin::SubmissionsController.export(Krout::Env)
  get "/submissions/export.:format",  &->Admin::SubmissionsController.export(Krout::Env)

  get   "/events",                  &->Admin::EventsController.index(Krout::Env)
  get   "/events/:event_id",        &->Admin::EventsController.show(Krout::Env)
  get   "/events/new",              &->Admin::EventsController._new(Krout::Env)
  post  "/events/create",           &->Admin::EventsController.create(Krout::Env)
  get   "/events/:event_id/edit",   &->Admin::EventsController.edit(Krout::Env)
  post  "/events/:event_id/update", &->Admin::EventsController.update(Krout::Env)
end



scope "/api" do
  get "/stream-status",   &->API::StreamStatusController.index(Krout::Env)
end


get "/", &->StaticController.index(Krout::Env)
get "/volunteer", &->StaticController.volunteer(Krout::Env)
get "/event-calendar", &->StaticController.event_calendar(Krout::Env)

get   "/signin",  &->SessionsController._new(Krout::Env)
post  "/signin",  &->SessionsController.create(Krout::Env)
get   "/signout", &->SessionsController.destroy(Krout::Env)
