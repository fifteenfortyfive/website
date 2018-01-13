get "/accounts/new" do
  render "views/accounts/new.slang", "views/_layout.slang"
end

post "/accounts/create" do |env|
  env.response.content_type = "application/json"
  account = Account.new
  account.username = env.params.body["username"].as(String)
  account.password = env.params.body["password"].as(String)

  changeset = Repo.insert(account)
end
