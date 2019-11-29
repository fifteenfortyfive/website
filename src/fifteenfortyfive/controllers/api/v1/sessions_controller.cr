class API::SessionsController < AppController
  def login
    username = json_params["username"].as_s
    password = json_params["password"].as_s

    account = Accounts.get_account_from_username(username)

    unless account
      render_error_json(Errors::Unprocessable)
      return
    end

    unless account.password_matches?(password)
      render_error_json(Errors::Unprocessable)
      return
    end

    session = sign_in_user(account)

    render_json({
      session_id: session.id,
    })
  end

  def logout
    if session = @context.session?
      Accounts.invalidate_session(session)
    end

    render_json({
      logged_out: true,
    })
  end
end
