require "./analytics/event"
require "./analytics/events/**"

module Analytics
  extend self

  ###
  # Events
  ###

  def list_events(query : Query = Query.new)
    Repo.all(Event, query)
  end

  def get_event(event_id, query : Query = Query.new)
    Repo.all(Event, query.where(id: account_id).limit(1)).first?
  end

  def new_event()
    Event.new
  end

  def create_event(attrs)
    event = Event.new
    event = event.cast(attrs)
    Repo.insert(event)
  end

  def update_event(event : Event, changes)
    changeset = event.cast(changes)
    Repo.update(changeset)
  end

  def delete_event(event : Event)
    Repo.delete(event)
  end

  def track(event : Event)
    Repo.insert(event)
  end
end
