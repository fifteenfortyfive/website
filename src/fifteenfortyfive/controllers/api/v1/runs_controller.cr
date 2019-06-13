require "../../../contexts/events"
require "../../errors"

class API::RunsController < AppController
  def index
    event_id = url_params["event_id"]
    query = Query.where(event_id: event_id)

    if run_ids = query_params["run_ids"]?
      query = query.where(id: run_ids.split(','))
    end

    render_json({
      runs: Events.list_run_submissions(query)
    })
  end

  def get
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run_submission(run_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      run: run
    })
  end
end
