class SessionsController < AppController
  def new
    redirect_target = query_params["redirect"]? || "/"
    render("sessions/new.html.j2")
  end

  def create
    username = body_params["username"]
    password = body_params["password"]
    redirect_target = query_params["redirect"]? || "/"

    account = Accounts.get_account_from_username(username)

    unless account
      render_error(422, "Username does not exist")
      return
    end

    unless account.password_matches?(password)
      render_error(422, "Wrong password")
      return
    end

    sign_in_user(account)
    redirect_to(redirect_target)
  end

  def destroy
    if session = @context.session?
      session.active = false
      Repo.update(session)
    end

    redirect_to("/")
  end
end
