module SessionsController
  extend BaseController
  extend self

  def _new(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    redirect_target = env.params.query["redirect"]? || "/"
    render_view "sessions/new"
  end

  def create(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    username = env.params.body["username"].as(String)
    password = env.params.body["password"].as(String)
    redirect_target = env.params.query["redirect"]? || "/"

    account = Repo.get_by(Account, username: username)

    unless account
      render_error(env, 422, "Username does not exist")
      return
    end

    unless account.password_matches?(password)
      render_error(env, 422, "Wrong password")
      return
    end

    sign_in_user(env, account)
    env.redirect(redirect_target)
  end

  def destroy(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    if session = env.session?
      session.active = false
      Repo.update(session)
    end

    env.redirect("/")
  end
end
