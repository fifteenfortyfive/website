require "http"

# A middleware for ensuring that a user is logged in. This handler does NOT
# perform authorization or handling of permissions.
#
# If a user is not logged in, they will be redirected to the login page with
# a callback to bring them back to the originally-requested route.
class AuthenticationHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def call(conn : HTTP::Server::Context)
    unless conn.current_user?
      conn.response.headers.add "Location", login_path(redirect: conn.request.path)
      conn.response.status_code = 302
      return
    end

    call_next(conn)
  end
end
