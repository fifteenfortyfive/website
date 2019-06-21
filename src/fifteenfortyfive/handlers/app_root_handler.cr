require "http"

require "../util/template"

# A middleware for defaulting unmatched routes to be handled by a
# dynamic frontend. Essentially the easiest way to allow react-router
# to match
class AppRootHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def call(conn : HTTP::Server::Context)
    conn.response.status_code = 200
    Template.render(conn, "static/app_root.html.j2")
  end
end
