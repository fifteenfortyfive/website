require "http"

# A middleware for responding to all OPTIONS requests under the given path and
# inserting the necessary `Access-Control-*` headers to regular responses.
class CORSHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def initialize(@path : String)
  end

  def call(conn : HTTP::Server::Context)
    unless conn.request.method == "OPTIONS"
      _add_default_headers(conn)
      call_next(conn)
      return
    end

    if conn.request.path.starts_with?(@path)
      puts "Matching the request"
      conn.response.status_code = 200
      _add_default_headers(conn)
      return
    end

    conn.response.status_code = 404
  end


  private def _add_default_headers(conn : HTTP::Server::Context)
    conn.response.headers["Access-Control-Allow-Origin"] = conn.request.headers["Origin"]? || "*"
    conn.response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
    conn.response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
  end
end
