require "../../../contexts/events"
require "../../errors"

class API::EventsController < AppController
  def index
    query = Query.order_by("start_time DESC").preload([:series])

    if event_ids = query_params["event_ids"]?
      query = query.where(id: event_ids.split(','))
    end

    render_json({
      events: Events.list_events(query)
    })
  end

  def get
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    query = Query.preload([:series])

    unless event = Events.get_event(event_id, query)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      event: event
    })
  end


  def start
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    changeset = Events.start_event(event, Time.utc_now)

    render_json({
      succeeded: !!(changeset && changeset.valid?),
      event: event
    })
  end

  def finish
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    changeset = Events.finish_event(event, Time.utc_now)

    render_json({
      succeeded: !!(changeset && changeset.valid?),
      event: event
    })
  end

  def resume
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    changeset = Events.resume_event(event, Time.utc_now)

    render_json({
      succeeded: !!(changeset && changeset.valid?),
      event: event
    })
  end

  def reset
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    changeset = Events.reset_event(event, Time.utc_now)

    render_json({
      succeeded: !!(changeset && changeset.valid?),
      event: event
    })
  end
end
