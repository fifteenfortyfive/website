require "http"

# A middleware for ensuring that a user is logged in. This handler does NOT
# perform authorization or handling of permissions.
#
# If a user is not logged in, they will be redirected to the login page with
# a callback to bring them back to the originally-requested route.
class AuthenticationHandler
  include HTTP::Handler
  include AppRouter::Helpers

  alias FailureProc = HTTP::Server::Context ->

  property! on_failure : FailureProc

  def initialize
  end

  def initialize(&@on_failure : FailureProc)
  end


  def call(conn : HTTP::Server::Context)
    if conn.current_user?
      call_next(conn)
      return
    end

    if failure_proc = @on_failure
      failure_proc.call(conn)
    else
      default_redirect(conn)
    end
  end

  def default_redirect(conn : HTTP::Server::Context)
    conn.response.headers.add "Location", login_path(redirect: conn.request.path)
    conn.response.status_code = 302
  end
end
