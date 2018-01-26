class HTTP::Server::Context
  property! current_user : Account
  property! session : Session
end

class SessionHandler < Kemal::Handler
  def call(env)
    set_current_user(env)
    call_next(env)
  end

  def set_current_user(env)
    return unless session_id = env.request.cookies["1545_session_id"]?

    session = Repo.get_by(Session, id: session_id.value)
    return unless session && session.valid?

    account = Repo.get_association(session, :account)
    return unless account

    env.session = session.as(Session)
    env.current_user = account.as(Account)
  end
end
