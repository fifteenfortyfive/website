module BaseController
  def render_404(env)
    env.response.status_code = 404
    env.response.print "Not Found"
    env.response.close
  end

  def render_error(env, code, message="")
    env.response.status_code = code
    env.response.print(message)
    env.response.close
  end


  def sign_in_user(env, account : Account)
    session = Session.build_for(account)
    Repo.insert(session)

    env.response.cookies["1545_session_id"] = session.id.not_nil!
  end
end
