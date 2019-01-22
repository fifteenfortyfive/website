class Admin::EventsController < AppController
  def index
    events = Events.list_events(Query.preload(:owner).order_by("start_time ASC"))
    render("admin/events/index.html.j2", {
      "events" => events
    })
  end

  def show
    event = Events.get_event(url_params["event_id"], Query.preload(:owner))
    render("admin/events/show.html.j2", {
      "event" => event
    })
  end

  def new
    render("admin/events/new.html.j2", {
      "event" => Events.new_event(),
      "games" => Inventory.list_games()
    })
  end

  def create
    changeset = Events.create_event(body_params)
    event = changeset.instance

    if changeset.valid?
      redirect_to("/admin/events/#{event.id}")
    else
      render("admin/events/new.html.j2", {
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end

  def edit
    event = Events.get_event(url_params["event_id"])
    render("admin/events/edit.html.j2", {
      "event" => event,
      "games" => Inventory.list_games()
    })
  end

  def update
    event = Events.get_event!(url_params["event_id"])
    changeset = Events.update_event(event, body_params)

    if changeset.valid?
      redirect_to("/admin/events/#{event.id}")
    else
      render("admin/events/edit.html.j2", {
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end
end
