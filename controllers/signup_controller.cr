post "/signup/submit" do |env|
  env.response.content_type = "application/json"
  signup = Signup.new(env.params.json)
  changeset = Repo.insert(signup)
  puts changeset
end

get "/signup" do |env|
  render "views/signup.slang", "views/_layout.slang"
end
