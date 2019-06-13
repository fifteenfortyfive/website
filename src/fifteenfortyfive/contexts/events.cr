require "./events/**"
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
