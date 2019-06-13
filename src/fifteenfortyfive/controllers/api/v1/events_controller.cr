require "../../../contexts/events"
require "../../errors"

class API::EventsController < AppController
  def index
    events =
      if event_ids = query_params["event_ids"]?
        Events.list_events(Query.where(id: event_ids.split(',')))
      else
        Events.list_events()
      end

    render_json({
      events: events
    })
  end

  def get
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      event: event
    })
  end
end
