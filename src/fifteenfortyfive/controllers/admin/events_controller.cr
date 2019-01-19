module Admin::EventsController
  extend BaseController
  extend self

  def index(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    events = Events.list_events(Query.preload(:owner).order_by("start_time ASC"))
    Template.render(env, "admin/events/index.html.j2", {
      "events" => events
    })
  end

  def show(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    event = Events.get_event(env.params.url["event_id"], Query.preload(:owner))
    Template.render(env, "admin/events/show.html.j2", {
      "event" => event
    })
  end

  def _new(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    Template.render(env, "admin/events/new.html.j2", {
      "event" => Events.new_event(),
      "games" => Inventory.list_games()
    })
  end

  def create(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    changeset = Events.create_event(env.params.body)
    event = changeset.instance

    if changeset.valid?
      env.redirect("/admin/events/#{event.id}")
    else
      Template.render(env, "admin/events/new.html.j2", {
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end

  def edit(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    event = Events.get_event(env.params.url["event_id"])
    Template.render(env, "admin/events/edit.html.j2", {
      "event" => event,
      "games" => Inventory.list_games()
    })
  end

  def update(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    event = Events.get_event!(env.params.url["event_id"])
    changeset = Events.update_event(event, env.params.body)

    if changeset.valid?
      env.redirect("/admin/events/#{event.id}")
    else
      Template.render(env, "admin/events/edit.html.j2", {
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end
end
