require "http"

# A middleware for responding to all OPTIONS requests under the given path
class OptionsHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def initialize(@path : String)
  end

  def call(conn : HTTP::Server::Context)
    unless conn.request.method == "OPTIONS"
      call_next(conn)
      return
    end

    if conn.request.path.starts_with?(@path)
      conn.response.status_code = 200
    else
      conn.response.status_code = 404
    end
  end
end
