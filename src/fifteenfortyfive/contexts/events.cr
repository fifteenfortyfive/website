require "./events/models/**"
require "crecto"

module Events
  extend self


  ###
  # Events
  ###

  EVENT_PRELOADS = [:game, :category, :series]
  def list_events(query : Query = Query.new)
    Repo.all(Event, query.preload(EVENT_PRELOADS))
  end

  def get_event(event_id, query : Query = Query.new)
    Repo.all(Event, query.where(id: event_id.to_s).preload(EVENT_PRELOADS).limit(1)).first?
  end

  def get_event!(event_id, query : Query = Query.new)
    Repo.all(Event, query.where(id: event_id.to_s).preload(EVENT_PRELOADS).limit(1)).first
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


  def start_event(event : Event, start_at : Time = Time.utc_now)
    return if event.actual_start_time

    changeset = event.cast({
      actual_start_time: start_at,
      actual_end_time: nil,
      actual_time_seconds: nil
    })

    Repo.update(changeset)
  end

  def finish_event(event : Event, finish_at : Time = Time.utc_now)
    return unless started_at = event.actual_start_time
    return if event.actual_end_time

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = event.cast({
      actual_time_seconds: elapsed_seconds,
      actual_end_time: finish_at,
    })
    Repo.update(changeset)
  end

  def resume_event(event : Event, resume_at : Time = Time.utc_now)
    return unless event.actual_end_time

    changeset = event.cast({
      actual_time_seconds: nil,
      actual_end_time: nil,
    })
    Repo.update(changeset)
  end

  def reset_event(event : Event, reset_at : Time = Time.utc_now)
    return unless event.actual_start_time

    changeset = event.cast({
      actual_time_seconds: nil,
      actual_start_time: nil,
      actual_end_time: nil,
    })
    Repo.update(changeset)
  end

  # Returns true if the event has any restrictions on types of run submissions.
  # This really just means if any AllowedRun records exist, regardless of
  # whether they form a blacklist or whitelist.
  def has_restricted_runs?(event : Event)
    event.allowed_runs ||= Repo.get_association(event, :allowed_runs).as(Array(AllowedRun))

    return event.allowed_runs.size == 0
  end

  def list_allowed_games(event : Event) : Array(Inventory::Game)
    allowed_runs = Repo.get_association(event, :allowed_runs).as(Array(AllowedRun))

    query = Query.new
    if allowed_runs.size > 0
      query = query.where(id: allowed_runs.map(&.game_id))
    end

    Repo.all(Inventory::Game, query)
  end

  def list_allowed_categories(event : Event) : Array(Inventory::Category)
    allowed_runs = Repo.get_association(event, :allowed_runs).as(Array(AllowedRun))

    allowances = allowed_runs.select{ |a| a.category_id }.map(&.category_id)
    game_allowances = allowed_runs.select{ |a| a.game_id && !a.category_id }.map(&.game_id)

    query = Query.new
    if allowances.size > 0
      query = query.where(id: allowances)
    end
    if game_allowances.size > 0
      query = query.or_where(game_id: game_allowances)
    end

    Repo.all(Inventory::Category, query)
  end

  def can_submit_run?(event : Event, run : RunSubmission)
    allowed_runs =
      event.allowed_runs ||= Repo.get_association(event, :allowed_runs).as(Array(AllowedRun))

    return true if allowed_runs.size == 0

    passes_restrictions = allowed_runs.any? do |rule|
      matches = rule.game_id == run.game_id

      if rule.category_id
        matches = matches && rule.category_id == run.category_id
      end

      matches
    end

    return passes_restrictions
  end



  ###
  # Allowed Runs
  ###

  def list_allowed_runs(query : Query = Query.new)
    Repo.all(AllowedRun, query)
  end

  def list_allowed_runs(event_id, query : Query = Query.new)
    Repo.all(AllowedRun, query.where(event_id: event_id.to_s))
  end

  def get_allowed_run(allowed_run_id, query : Query = Query.new)
    Repo.all(AllowedRun, query
      .where(id: allowed_run_id.to_s)
      .preload([:game, :category])
      .limit(1)
    ).first?
  end

  def get_allowed_run!(allowed_run_id, query : Query = Query.new)
    Repo.all(AllowedRun, query
      .where(id: allowed_run_id.to_s)
      .preload([:game, :category])
      .limit(1)
    ).first
  end

  def new_allowed_run()
    AllowedRun.new
  end

  def create_allowed_run(attrs)
    allowed_run = AllowedRun.new
    allowed_run = allowed_run.cast(attrs)
    Repo.insert(allowed_run)
  end

  def update_allowed_run(allowed_run : AllowedRun, changes)
    changeset = allowed_run.cast(changes)
    Repo.update(changeset)
  end

  def delete_allowed_run(allowed_run : AllowedRun)
    Repo.delete(allowed_run)
  end



  ###
  # Teams
  ###

  def list_teams(query : Query = Query.new)
    Repo.all(Team, query)
  end

  def list_teams(event_id, query : Query = Query.new)
    Repo.all(Team, query.where(event_id: event_id.to_s))
  end

  def get_team(team_id, query : Query = Query.new)
    Repo.all(Team, query
      .where(id: team_id.to_s)
      .preload([:captain, :event])
      .limit(1)
    ).first?
  end

  def get_team!(team_id, query : Query = Query.new)
    Repo.all(Team, query
      .where(id: team_id.to_s)
      .preload([:captain, :event])
      .limit(1)
    ).first
  end

  def new_team()
    Team.new
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


  def start_team(team : Team, start_at : Time = Time.utc_now)
    return if team.actual_start_time

    changeset = team.cast({
      actual_start_time: start_at,
      actual_end_time: nil,
      actual_time_seconds: nil
    })

    Repo.update(changeset)
  end

  def finish_team(team : Team, finish_at : Time = Time.utc_now)
    return unless started_at = team.actual_start_time
    return if team.actual_end_time

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = team.cast({
      actual_time_seconds: elapsed_seconds,
      actual_end_time: finish_at,
    })
    Repo.update(changeset)
  end

  def resume_team(team : Team, resume_at : Time = Time.utc_now)
    return unless team.actual_end_time

    changeset = team.cast({
      actual_time_seconds: nil,
      actual_end_time: nil,
    })
    Repo.update(changeset)
  end

  def reset_team(team : Team, reset_at : Time = Time.utc_now)
    return unless team.actual_start_time

    changeset = team.cast({
      actual_time_seconds: nil,
      actual_start_time: nil,
      actual_end_time: nil,
    })
    Repo.update(changeset)
  end



  ###
  # Run Submissions
  ###

  def list_run_submissions(query : Query = Query.new)
    Repo.all(RunSubmission, query)
  end

  def list_run_submissions_for_account(event_id, account_id)
    Repo.all(RunSubmission, Query.where(account_id: account_id, event_id: event_id).order_by("rank ASC"))
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

  def get_runner_submission_for_account(event_id, account_id)
    query = Query.where(account_id: account_id, event_id: event_id)
    Repo.all(RunnerSubmission, query.limit(1)).first?
  end

  def get_runner_submission_for_account!(event_id, account_id)
    query = Query.where(account_id: account_id, event_id: event_id)
    Repo.all(RunnerSubmission, query.limit(1)).first
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

  def ensure_runner_submission!(event_id, account_id)
    if existing = get_runner_submission_for_account(event_id, account_id)
      return existing
    end

    changeset = create_runner_submission({
      event_id: event_id,
      account_id: account_id
    })

    changeset.instance
  end

  def update_runner_submission(submission : RunnerSubmission, changes)
    changeset = submission.cast(changes)
    Repo.update(changeset)
  end

  def delete_runner_submission(submission : RunnerSubmission)
    Repo.delete(submission)
  end

  def delete_existing_submissions(account_id, event_id)
    submissions = Events.list_runner_submissions(
      Query.where(account_id: account_id, event_id: event_id)
    )

    submissions.each do |submission|
      run_submissions = Events.list_run_submissions(Query.where(runner_submission_id: submission.id))
      run_submissions.each do |run|
        Events.delete_run_submission(run)
      end

      Events.delete_runner_submission(submission)
    end
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
