get "/accounts/new" do |env|
  error = nil
  render "src/views/accounts/new.slang", "src/views/_layout.slang"
end

post "/accounts/create" do |env|
  account = Account.new
  account.username  = env.params.body["username"]?.as?(String)
  account.password  = env.params.body["password"]?.as?(String)

  account.discord   = env.params.body["discord"]?.as?(String)
  account.twitch    = env.params.body["twitch"]?.as?(String)
  account.twitter   = env.params.body["twitter"]?.as?(String)

  account.timezone  = env.params.body["timezone"]?.as?(String)

  changeset = Repo.insert(account)

  if changeset.valid?
    sign_in_user(env, changeset.instance)
    env.redirect("/")
  else
    render "src/views/accounts/new.slang", "src/views/_layout.slang"
  end
end

get "/accounts/signin" do |env|
  redirect_target = env.params.query["redirect"]? || "/"
  render "src/views/accounts/signin.slang", "src/views/_layout.slang"
end

post "/accounts/signin" do |env|
  username = env.params.body["username"].as(String)
  password = env.params.body["password"].as(String)
  redirect_target = env.params.query["redirect"]? || "/"

  account = Repo.get_by(Account, username: username)

  unless account
    halt(env, status_code: 422, response: "Username does not exist")
  end

  unless account.password_matches?(password)
    halt(env, status_code: 422, response: "Wrong password")
  end

  sign_in_user(env, account)
  env.redirect(redirect_target)
end

get "/accounts/signout" do |env|
  if session = env.session?
    session.active = false
    Repo.update(session)
  end

  env.redirect("/")
end


def sign_in_user(env, account : Account)
  session = Session.build_for(account)
  Repo.insert(session)

  env.response.cookies["1545_session_id"] = session.id.not_nil!
end
