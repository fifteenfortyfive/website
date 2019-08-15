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

  def allowed_runs
    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      games: Events.list_allowed_games(event),
      categories: Events.list_allowed_categories(event)
    })
  end


  def submit
    account = @context.current_user

    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless event = Events.get_event(event_id)
      render_error_json(Errors::NotFound)
      return
    end

    runner_params = json_params["runner"]?.try(&.as_h?)
    runs_params = json_params["runs"]?.try(&.as_a?)

    if !runner_params || !runs_params
      render_error_json(Errors::Unprocessable)
      return
    end

    Events.delete_existing_submissions(account.id, event_id)

    identifying_params = {
      "account_id" => account.id,
      "event_id" => event_id
    }

    runner_params = runner_params.merge(identifying_params)
    runner_changeset = Events.create_runner_submission(runner_params)

    unless runner_changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    rank = 1
    run_changesets = runs_params.map do |run_params|
      run_params = run_params.as_h.merge({
        "account_id" => account.id,
        "event_id" => event_id,
        "runner_submission_id" => runner_changeset.instance.id,
        "pb_seconds" => Events.convert_time_string_to_seconds!(run_params["pb"].as_s),
        "est_seconds" => Events.convert_time_string_to_seconds!(run_params["est"].as_s),
        "rank" => rank
      })

      rank += 1
      run_submission = Events.create_run_submission(run_params)
    end

    unless run_changesets.all?(&.valid?)
      render_error_json(Errors::Unprocessable)
      return
    end

    submission = runner_changeset.instance
    submission.run_submissions = run_changesets.map(&.instance)

    render_json({
      submission: submission
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
