require "http"

# A middleware for ensuring that a user has permissions to access a component
# of the application. This handler assumes that `conn.current_user` exists
# (e.g., AuthenticationHandler should be placed _before_ this handler).
class AuthorizationHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def initialize(@required_level = :admin)
  end

  def call(conn : HTTP::Server::Context)
    passed =
      case @required_level
      when :admin
        !!conn.current_user.admin
      else
        false
      end

    unless passed
      conn.response.headers.add "Location", login_path(redirect: conn.request.path)
      conn.response.status_code = 302
      return
    end

    call_next(conn)
  end
end
