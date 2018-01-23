get "/register" do
  render "views/registrations/index.slang", "views/_layout.slang"
end

get "/register/runner" do
  render "views/registrations/runner.slang", "views/_layout.slang"
end

get "/register/commentator" do
  render "views/registrations/commentator.slang", "views/_layout.slang"
end
