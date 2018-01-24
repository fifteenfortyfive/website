class HTTP::Server::Context
  property! current_user : Account
  property! session : Session
end

# Before every request, get the logged in user.
before_all do |env|
  next unless session_id = env.request.cookies["1545_session_id"]?

  session = Repo.get_by(Session, id: session_id.value)
  next unless session && session.valid?

  account = Repo.get_association(session, :account)
  next unless account

  env.session = session.as(Session)
  env.current_user = account.as(Account)
end

