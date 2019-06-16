require "../../../services/stream_status_service"

require "../../../contexts/streams"
require "../../errors"

class API::StreamsController < AppController
  def index
    streams = StreamStatusService.statuses

    render_json({
      streams: streams
    })
  end

  def get
    unless account_id = url_params["account_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless stream = StreamStatusService.get(account_id.to_i64)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      stream: stream
    })
  end
end
