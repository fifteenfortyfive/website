require "awscr-s3"
require "../contexts/accounts"

module RunSubmissionsController
  extend BaseController
  extend self

  def index(env)
    event = Events.get_event!(env.params.url["event_id"])
    submissions = Events.list_run_submissions(Query.
      where(event_id: event.id, revoked: "false").
      preload([:account, :game])
    )

    Template.render(env, "run_submissions/index.html.j2", {
      "event" => event,
      "submissions" => submissions
    })
  end

  def _new(env)
    unless env.current_user?
      env.redirect("/signin?redirect=#{env.request.path}")
      return
    end

    event = Events.get_event!(env.params.url["event_id"], Query.preload(:game))

    unless Events.accepting_submissions?(event)
      env.redirect("/events/#{event.id}")
      return
    end

    Template.render(env, "run_submissions/new.html.j2", {
      "submission" => Events.new_run_submission(),
      "event" => event,
      "games" => Inventory.list_games()
    })
  end

  def create(env)
    unless env.current_user?
      env.redirect("/signin?redirect=#{env.request.path}")
      return
    end

    event = Events.get_event!(env.params.url["event_id"], Query.preload(:game))

    unless Events.accepting_submissions?(event)
      env.redirect("/events/#{event.id}")
      return
    end

    updated_params = env.params.body.to_h.merge({
      "event_id" => event.id,
      "account_id" => env.current_user.id,
      "pb_seconds" => Events.convert_time_string_to_seconds!(env.params.body["pb"]),
      "est_seconds" => Events.convert_time_string_to_seconds!(env.params.body["estimate"])
    })

    changeset = Events.create_run_submission(updated_params)
    submission = changeset.instance

    if changeset.valid?
      env.redirect("/events/#{event.id}")
    else
      Template.render(env, "run_submissions/new.html.j2", {
        "submission" => submission,
        "event" => event,
        "games" => Inventory.list_games()
      })
    end
  end
end
