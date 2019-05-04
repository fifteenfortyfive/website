require "auto_initialize"

require "../event"

module Analytics::Events
  struct PageRequest < EventData
    JSON.mapping(
      request_id: String,
      path: String,
      # time stored as nanoseconds
      processing_time: Float64
    )
  end

  Event.register_type("page_requested", PageRequest)

  def Event.page_requested(request_id : String, path : String, processing_time : Float64, timestamp : Time)
    Event.new(
      type: "page_requested",
      data: {
        request_id: request_id,
        path: path,
        processing_time: processing_time
      },
      timestamp: timestamp
    )
  end
end
