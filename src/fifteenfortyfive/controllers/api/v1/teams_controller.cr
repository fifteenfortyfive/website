require "../../../contexts/events"
require "../../errors"

class API::TeamsController < AppController
  def index
    event_id = url_params["event_id"]
    query = Query.where(event_id: event_id).preload(:runs)

    if team_ids = query_params["team_ids"]?
      query = query.where(id: team_ids.split(','))
    end

    render_json({
      teams: Events.list_teams(event_id, query)
    })
  end

  def get
    unless team_id = url_params["team_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless team = Events.get_team(team_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      team: team
    })
  end
end
