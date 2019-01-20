require "awscr-s3"
require "../contexts/accounts"

module EventsController
  extend BaseController
  extend self

  def index(env)
    events = Events.list_events(Query.order_by("start_time ASC").where("start_time > now()"))

    Template.render(env, "events/index.html.j2", {
      "events" => events
    })
  end

  def show(env)
    event = Events.get_event!(env.params.url["event_id"], Query.
      preload(:game).
      preload(:run_submissions, Query.preload([:account, :game]))
    )

    Template.render(env, "events/show.html.j2", {
      "event" => event
    })
  end
end
