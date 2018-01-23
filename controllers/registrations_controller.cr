get "/register" do |env|
  render "views/registrations/index.slang", "views/_layout.slang"
end

get "/register/runner" do |env|
  render "views/registrations/runner.slang", "views/_layout.slang"
end

get "/register/commentator" do |env|
  render "views/registrations/commentator.slang", "views/_layout.slang"
end
