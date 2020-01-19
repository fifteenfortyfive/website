require "../../../../contexts/events"
require "../../../errors"

class API::Admin::EventsController < AppController
  def index
    events = Events.list_events

    render_json({
      events: events,
    })
  end

  def get
    event_id = url_params["event_id"]
    unless event = Events.get_event(event_id)
      return render_error_json(Errors::NotFound)
    end

    render_json({
      event:     event,
      runs:      Runs.list_runs(Query.where(event_id: event_id)),
      schedules: Schedules.list_schedules(Query.where(event_id: event_id)),
    })
  end
end
