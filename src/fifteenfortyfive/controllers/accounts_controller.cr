module AccountsController
  extend BaseController
  extend self

  def _new(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    error = nil
    render_view "accounts/new"
  end

  def create(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

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
      render_view "accounts/new"
    end
  end

  def edit(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    unless env.current_user?
      env.redirect("/signin")
      return
    end

    render_view "accounts/edit"
  end

  def update(env)
    unless env.feature_flags["signups"].enabled
      render_404(env)
      return
    end

    unless env.current_user?
      env.redirect("/signin")
      return
    end

    account = env.current_user
    account.username  = env.params.body["username"]?.as?(String)
    account.password  = env.params.body["password"]?.as?(String)

    account.discord   = env.params.body["discord"]?.as?(String)
    account.twitch    = env.params.body["twitch"]?.as?(String)
    account.twitter   = env.params.body["twitter"]?.as?(String)

    account.timezone  = env.params.body["timezone"]?.as?(String)

    changeset = Repo.update(account)

    if changeset.valid?
      sign_in_user(env, changeset.instance)
      env.redirect("/")
    else
      render_view "accounts/edit"
    end
  end
end
