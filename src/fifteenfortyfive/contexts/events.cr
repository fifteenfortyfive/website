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

  def new_event
    Event.new
  end

  def create_event(attrs)
    parsed_attrs = attrs.to_h.merge({
      "start_time"             => maybe_parse_date_time(attrs, "start_time"),
      "end_time"               => maybe_parse_date_time(attrs, "end_time"),
      "signups_open_time"      => maybe_parse_date_time(attrs, "signups_open_time"),
      "signups_closed_time"    => maybe_parse_date_time(attrs, "signups_closed_time"),
      "runners_announced_time" => maybe_parse_date_time(attrs, "runners_announced_time"),
    })

    event = Event.new
    event = event.cast(parsed_attrs)
    Repo.insert(event)
  end

  def update_event(event : Event, changes)
    parsed_changes = changes.to_h.merge({
      "start_time"             => maybe_parse_date_time(changes, "start_time"),
      "end_time"               => maybe_parse_date_time(changes, "end_time"),
      "signups_open_time"      => maybe_parse_date_time(changes, "signups_open_time"),
      "signups_closed_time"    => maybe_parse_date_time(changes, "signups_closed_time"),
      "runners_announced_time" => maybe_parse_date_time(changes, "runners_announced_time"),
    })

    changeset = event.cast(parsed_changes)
    Repo.update(changeset)
  end

  def delete_event(event : Event)
    Repo.delete(event)
  end

  def start_event(event : Event, start_at : Time = Time.utc)
    return if event.actual_start_time

    changeset = event.cast({
      actual_start_time:   start_at,
      actual_end_time:     nil,
      actual_time_seconds: nil,
    })

    Repo.update(changeset)
  end

  def finish_event(event : Event, finish_at : Time = Time.utc)
    return unless started_at = event.actual_start_time
    return if event.actual_end_time

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = event.cast({
      actual_time_seconds: elapsed_seconds,
      actual_end_time:     finish_at,
    })
    Repo.update(changeset)
  end

  def resume_event(event : Event, resume_at : Time = Time.utc)
    return unless event.actual_end_time

    changeset = event.cast({
      actual_time_seconds: nil,
      actual_end_time:     nil,
    })
    Repo.update(changeset)
  end

  def reset_event(event : Event, reset_at : Time = Time.utc)
    return unless event.actual_start_time

    changeset = event.cast({
      actual_time_seconds: nil,
      actual_start_time:   nil,
      actual_end_time:     nil,
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

    allowances = allowed_runs.select { |a| a.category_id }.map(&.category_id)
    game_allowances = allowed_runs.select { |a| a.game_id && !a.category_id }.map(&.game_id)

    query = Query.new
    if allowances.size > 0
      query = query.where(id: allowances)
    end
    if game_allowances.size > 0
      query = query.or_where(game_id: game_allowances)
    end

    Repo.all(Inventory::Category, query)
  end

  def accepting_submissions?(event : Event)
    return event.state == "signups open"
  end

  def can_submit_run?(event : Event, run : Submissions::Submission)
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

  def new_allowed_run
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

  def new_team
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

  def start_team(team : Team, start_at : Time = Time.utc)
    return if team.actual_start_time

    changeset = team.cast({
      actual_start_time:   start_at,
      actual_end_time:     nil,
      actual_time_seconds: nil,
    })

    Repo.update(changeset)
  end

  def finish_team(team : Team, finish_at : Time = Time.utc)
    return unless started_at = team.actual_start_time
    return if team.actual_end_time

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = team.cast({
      actual_time_seconds: elapsed_seconds,
      actual_end_time:     finish_at,
    })
    Repo.update(changeset)
  end

  def resume_team(team : Team, resume_at : Time = Time.utc)
    return unless team.actual_end_time

    changeset = team.cast({
      actual_time_seconds: nil,
      actual_end_time:     nil,
    })
    Repo.update(changeset)
  end

  def reset_team(team : Team, reset_at : Time = Time.utc)
    return unless team.actual_start_time

    changeset = team.cast({
      actual_time_seconds: nil,
      actual_start_time:   nil,
      actual_end_time:     nil,
    })
    Repo.update(changeset)
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

    return hours.to_i * 3600 +
      minutes.to_i * 60 +
      seconds.to_i
  end

  def seconds_to_string(seconds : Int)
    hours = (seconds / 3600).to_i
    minutes = (seconds / 60) % 60
    seconds = seconds % 60

    sprintf("%02d:%02d:%02d", hours, minutes, seconds)
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
