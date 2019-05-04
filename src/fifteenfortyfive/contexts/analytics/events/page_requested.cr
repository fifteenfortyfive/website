require "auto_initialize"

require "../event"

module Analytics::Events
  struct PageRequest < EventData
    JSON.mapping(
      request_id: String,
      path: String,
      response_status: Int32,
      # time stored as nanoseconds
      response_time: Float64
    )
  end

  Event.register_type("page_requested", PageRequest)

  def Event.page_requested(conn : HTTP::Server::Context, processing_time : Float64, timestamp : Time)
    Event.new(
      type: "page_requested",
      data: {
        request_id: conn.request_id.to_s,
        request_host: conn.request.host,
        request_path: conn.request.path,
        request_method: conn.request.method,
        referrer: conn.request.headers["Referer"]?,
        request_user_agent: conn.request.headers["User-Agent"]?,
        response_status: conn.response.status_code,
        response_content_type: conn.response.headers["Content-Type"]?,
        response_content_length: conn.response.headers["Content-Length"]?,
        is_authenticated: !!conn.session?,
        processing_time: processing_time
      },
      timestamp: timestamp
    )
  end
end
