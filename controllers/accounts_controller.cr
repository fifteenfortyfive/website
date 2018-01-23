get "/accounts/new" do |env|
  render "views/accounts/new.slang", "views/_layout.slang"
end

post "/accounts/create" do |env|
  env.response.content_type = "application/json"
  account = Account.new
  account.username = env.params.body["username"].as(String)
  account.password = env.params.body["password"].as(String)

  changeset = Repo.insert(account)
end

get "/accounts/signin" do |env|
  render "views/accounts/signin.slang", "views/_layout.slang"
end

post "/accounts/signin" do |env|
  username = env.params.body["username"].as(String)
  password = env.params.body["password"].as(String)

  account = Repo.get_by(Account, username: username)

  unless account
    halt(env, status_code: 422, response: "Username does not exist")
  end

  unless account.password_matches?(password)
    halt(env, status_code: 422, response: "Wrong password")
  end

  session = Session.build_for(account)
  Repo.insert(session)

  env.response.cookies["1545_session_id"] = session.id.not_nil!
  env.redirect("/register")
end

get "/accounts/signout" do |env|
  if session = env.session?
    session.active = false
    Repo.update(session)
  end

  env.redirect("/")
end
