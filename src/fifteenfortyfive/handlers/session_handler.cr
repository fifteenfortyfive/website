require "http"

class HTTP::Server::Context
  property! current_user : Accounts::Account
  property! session : Accounts::Session
end

class SessionHandler
  include HTTP::Handler

  def call(conn : HTTP::Server::Context)
    set_current_user(conn)
    call_next(conn)
  end

  def set_current_user(conn)
    return unless session_id = conn.request.cookies["1545_session_id"]?
    session_id = session_id.value

    session = Accounts.get_valid_session(session_id)
    return unless session

    account = Accounts.get_account_for_session(session)
    return unless account

    conn.session = session.as(Accounts::Session)
    conn.current_user = account.as(Accounts::Account)
  end
end
