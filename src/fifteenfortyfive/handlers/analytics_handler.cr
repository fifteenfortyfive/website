require "http"
require "uuid"

class HTTP::Server::Context
  property! request_id : UUID
end

# A middleware for logging analytics events about the request
class AnalyticsHandler
  include HTTP::Handler
  include AppRouter::Helpers

  def call(conn : HTTP::Server::Context)
    conn.request_id = UUID.random()
    path = conn.request.path

    request_start = Time.now
    call_next(conn)
    request_end = Time.now

    processing_time = (request_end - request_start).total_nanoseconds

    Analytics.track(
      Analytics::Event.page_requested(
        request_id: conn.request_id.to_s,
        path: path,
        processing_time: processing_time,
        timestamp: request_start
      )
    )
  end
end
