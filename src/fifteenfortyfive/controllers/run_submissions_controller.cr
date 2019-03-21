require "awscr-s3"
require "../contexts/accounts"

class RunSubmissionsController < AppController
  def index
    event = Events.get_event!(url_params["event_id"])
    submissions = Events.list_run_submissions(Query.
      where(event_id: event.id, revoked: "false").
      preload([:account, :game]).
      order_by("created_at ASC")
    )

    render("run_submissions/index.html.j2", {
      "event" => event,
      "submissions" => submissions
    })
  end

  def new
    event = Events.get_event!(url_params["event_id"], Query.preload(:game))

    unless Events.accepting_submissions?(event)
      redirect_to events_show_path(event_id: event.id)
      return
    end

    render("run_submissions/new.html.j2", {
      "submission" => Events.new_run_submission(),
      "event" => event,
      "games" => Inventory.list_games()
    })
  end

  def create
    event = Events.get_event!(url_params["event_id"], Query.preload(:game))

    unless Events.accepting_submissions?(event)
      redirect_to events_show_path(event_id: event.id)
      return
    end

    updated_params = body_params.merge({
      "event_id" => event.id,
      "account_id" => @context.current_user.id,
      "pb_seconds" => Events.convert_time_string_to_seconds!(body_params["pb"]),
      "est_seconds" => Events.convert_time_string_to_seconds!(body_params["estimate"])
    })

    changeset = Events.create_run_submission(updated_params)
    submission = changeset.instance

    if changeset.valid?
      redirect_to events_show_path(event_id: event.id)
    else
      render("run_submissions/new.html.j2", {
        "submission" => submission,
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end
end
