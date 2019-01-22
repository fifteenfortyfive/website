require "awscr-s3"
require "../contexts/accounts"

class EventsController < AppController
  def index
    events = Events.list_events(Query.order_by("start_time ASC").where("start_time > now()"))

    render("events/index.html.j2", {
      "events" => events
    })
  end

  def show
    event = Events.get_event!(url_params["event_id"], Query.
      preload(:game).
      preload(:run_submissions, Query.preload([:account, :game]))
    )

    render("events/show.html.j2", {
      "event" => event
    })
  end
end
