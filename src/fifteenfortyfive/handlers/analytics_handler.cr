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
    conn.request_id = UUID.random
    path = conn.request.path

    request_start = Time.now
    call_next(conn)
    request_end = Time.now

    processing_time = (request_end - request_start).total_nanoseconds

    # Forcing `flush` ensures that requests all act "atomically". Or, at least,
    # so long as the request does not crash the server, all analytics events
    # for that request will be sent as soon as it finishes processing.
    Analytics.track({
      "type"                    => Analytics::Events::PAGE_REQUESTED,
      "request_id"              => conn.request_id.to_s,
      "timestamp"               => request_start,
      "request_host"            => conn.request.host,
      "request_path"            => conn.request.path,
      "request_method"          => conn.request.method,
      "referrer"                => conn.request.headers["Referer"]?,
      "request_user_agent"      => conn.request.headers["User-Agent"]?,
      "response_status"         => conn.response.status_code,
      "response_content_type"   => conn.response.headers["Content-Type"]?,
      "response_content_length" => conn.response.headers["Content-Length"]?,
      "is_authenticated"        => !!conn.session?,
      "processing_time"         => processing_time,
    }, flush: true)
  end
end
