require "./events/models/**"
require "crecto"

module Events
  extend self


  ###
  # Events
  ###

  def list_events(query : Query = Query.new)
    Repo.all(Event, query)
  end

  def get_event(event_id, query : Query = Query.new)
    Repo.all(Event, query.where(id: event_id.to_s).limit(1)).first?
  end

  def get_event!(event_id, query : Query = Query.new)
    Repo.all(Event, query.where(id: event_id.to_s).limit(1)).first
  end

  def new_event()
    Event.new
  end

  def create_event(attrs)
    parsed_attrs = attrs.to_h.merge({
      "start_time"              => maybe_parse_date_time(attrs, "start_time"),
      "end_time"                => maybe_parse_date_time(attrs, "end_time"),
      "signups_open_time"       => maybe_parse_date_time(attrs, "signups_open_time"),
      "signups_closed_time"     => maybe_parse_date_time(attrs, "signups_closed_time"),
      "runners_announced_time"  => maybe_parse_date_time(attrs, "runners_announced_time")
    })

    event = Event.new
    event = event.cast(parsed_attrs)
    Repo.insert(event)
  end

  def update_event(event : Event, changes)
    parsed_changes = changes.to_h.merge({
      "start_time"              => maybe_parse_date_time(changes, "start_time"),
      "end_time"                => maybe_parse_date_time(changes, "end_time"),
      "signups_open_time"       => maybe_parse_date_time(changes, "signups_open_time"),
      "signups_closed_time"     => maybe_parse_date_time(changes, "signups_closed_time"),
      "runners_announced_time"  => maybe_parse_date_time(changes, "runners_announced_time")
    })

    changeset = event.cast(parsed_changes)
    Repo.update(changeset)
  end

  def delete_event(event : Event)
    Repo.delete(event)
  end



  ###
  # Teams
  ###

  def list_teams(event_id, query : Query = Query.new)
    Repo.all(Team, query.where(event_id: event_id.to_s))
  end

  def get_team(team_id, query : Query = Query.new)
    Repo.all(Team, query.where(id: team_id.to_s).limit(1)).first?
  end

  def get_team!(team_id, query : Query = Query.new)
    Repo.all(Team, query.where(id: team_id.to_s).limit(1)).first
  end

  def new_team()
    Team.new
  end

  def create_team(submission : Team)
    Repo.insert(submission)
  end

  def create_team(attrs)
    team = Team.new
    team = team.cast(attrs)
    Repo.insert(team)
  end

  def update_team(team : Team, changes)
    changeset = team.cast(changes)
    Repo.update(changeset)
  end

  def delete_team(team : Team)
    Repo.delete(team)
  end



  ###
  # Run Submissions
  ###

  def list_run_submissions(query : Query = Query.new)
    Repo.all(RunSubmission, query)
  end

  def get_run_submission(submission_id, query : Query = Query.new)
    Repo.all(RunSubmission, query.where(id: submission_id.to_s).limit(1)).first?
  end

  def get_run_submission!(submission_id, query : Query = Query.new)
    Repo.all(RunSubmission, query.where(id: submission_id.to_s).limit(1)).first
  end

  def new_run_submission()
    RunSubmission.new
  end

  def create_run_submission(submission : RunSubmission)
    Repo.insert(submission)
  end

  def create_run_submission(attrs)
    submission = RunSubmission.new
    submission = submission.cast(attrs)
    Repo.insert(submission)
  end

  def update_run_submission(submission : RunSubmission, changes)
    changeset = submission.cast(changes)
    Repo.update(changeset)
  end

  def delete_run_submission(submission : RunSubmission)
    Repo.delete(submission)
  end

  def accept_run_submission(submission : RunSubmission)
    submission.accepted = true
    Repo.update(submission)
  end

  def unaccept_run_submission(submission : RunSubmission)
    submission.accepted = false
    Repo.update(submission)
  end



  ###
  # Runner Submissions
  ###

  def list_runner_submissions(query : Query = Query.new)
    Repo.all(RunnerSubmission, query)
  end

  def get_runner_submission(submission_id, query : Query = Query.new)
    Repo.all(RunnerSubmission, query.where(id: submission_id.to_s).limit(1)).first?
  end

  def get_runner_submission!(submission_id, query : Query = Query.new)
    Repo.all(RunnerSubmission, query.where(id: submission_id.to_s).limit(1)).first
  end

  def new_runner_submission()
    RunnerSubmission.new
  end

  def create_runner_submission(submission : RunnerSubmission)
    Repo.insert(submission)
  end

  def create_runner_submission(attrs)
    submission = RunnerSubmission.new
    submission = submission.cast(attrs)
    Repo.insert(submission)
  end

  def update_runner_submission(submission : RunnerSubmission, changes)
    changeset = submission.cast(changes)
    Repo.update(changeset)
  end

  def delete_runner_submission(submission : RunnerSubmission)
    Repo.delete(submission)
  end



  ###
  # Runs
  ###

  def list_runs(query : Query = Query.new)
    Repo.all(Run, query)
  end

  def get_run(run_id, query : Query = Query.new)
    Repo.all(Run, query.where(id: run_id.to_s).limit(1)).first?
  end

  def get_run!(run_id, query : Query = Query.new)
    Repo.all(Run, query.where(id: run_id.to_s).limit(1)).first
  end

  def new_run()
    Run.new
  end

  def create_run(run : Run)
    Repo.insert(run)
  end

  def create_run(attrs)
    run = Run.new
    run = run.cast(attrs)
    Repo.insert(run)
  end

  def update_run(run : Run, changes)
    changeset = run.cast(changes)
    Repo.update(changeset)
  end

  def delete_run(run : Run)
    Repo.delete(run)
  end



  ###
  # Run Events
  ###

  def start_run(run : Run, start_at : Time = Time.utc_now)
    return if run.started_at

    run_event = log_run_event(run.id, "run_started", start_at)

    changeset = run.cast({
      finished: "false",
      actual_seconds: nil,
      started_at: start_at,
      finished_at: nil
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def finish_run(run : Run, finish_at : Time = Time.utc_now)
    return unless started_at = run.started_at
    return if run.finished_at

    run_event = log_run_event(run.id, "run_finished", finish_at)

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = run.cast({
      finished: "true",
      actual_seconds: elapsed_seconds,
      finished_at: finish_at,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def resume_run(run : Run, resume_at : Time = Time.utc_now)
    return unless run.finished_at
    run_event = log_run_event(run.id, "run_resumed", resume_at)

    changeset = run.cast({
      finished: "false",
      actual_seconds: nil,
      finished_at: nil,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def reset_run(run : Run, reset_at : Time = Time.utc_now)
    return unless run.started_at
    run_event = log_run_event(run.id, "run_reset", reset_at)

    changeset = run.cast({
      finished: "false",
      actual_seconds: nil,
      started_at: nil,
      finished_at: nil,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def log_run_event(run_id, type : String, timestamp : Time)
    run_event = RunEvent.new
    run_event = run_event.cast({
      run_id: run_id,
      type: type,
      occurred_at: timestamp
    })
    Repo.insert(run_event)
  end



  ###
  # Utility
  ###

  # Return an integer representing the number of seconds contained in
  # the Time given by `time_string`. This method assumes that `time_string`
  # is a String in the format "00:00:00".
  def convert_time_string_to_seconds!(time_string : String) : Int32
    units = time_string.split(":")
    hours, minutes, seconds = units[0], units[1], units[2]

    return  hours.to_i * 3600 +
            minutes.to_i * 60 +
            seconds.to_i
  end

  def seconds_to_string(seconds : Int)
    hours = (seconds / 3600).to_i
    minutes = (seconds / 60) % 60
    seconds = seconds % 60

    sprintf("%02d:%02d:%02d", hours, minutes, seconds)
  end

  def accepting_submissions?(event : Event)
    event.state == "signups open"
  end

  def maybe_parse_date_time(attrs, attribute)
    if (value = attrs[attribute]?) && !value.empty?
      puts value
      t = Time.parse(value, "%FT%T.%3NZ", Time::Location::UTC)
    else
      nil
    end
  end
end
