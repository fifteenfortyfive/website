require "../../../contexts/events"
require "../../errors"

class API::RunsController < AppController
  def index
    event_id = url_params["event_id"]
    query = Query.where(event_id: event_id)

    if run_ids = query_params["run_ids"]?
      query = query.where(id: run_ids.split(','))
    end

    if team_id = query_params["team_id"]?
      query = query.where(team_id: team_id)
    end

    render_json({
      runs: Events.list_runs(query)
    })
  end

  def get
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(run_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      run: run
    })
  end
end
