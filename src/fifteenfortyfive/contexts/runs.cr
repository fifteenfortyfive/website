require "crecto"

require "./runs/**"

module Runs
  extend self

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

  def new_run
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

  def start_run(run : Run, start_at : Time = Time.utc)
    return if run.started_at

    run_event = log_run_event(run.id, "run_started", start_at)

    changeset = run.cast({
      finished:       "false",
      actual_seconds: nil,
      started_at:     start_at,
      finished_at:    nil,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def finish_run(run : Run, finish_at : Time = Time.utc)
    return unless started_at = run.started_at
    return if run.finished_at

    run_event = log_run_event(run.id, "run_finished", finish_at)

    elapsed_seconds = (finish_at - started_at).total_seconds
    changeset = run.cast({
      finished:       "true",
      actual_seconds: elapsed_seconds,
      finished_at:    finish_at,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def resume_run(run : Run, resume_at : Time = Time.utc)
    return unless run.finished_at
    run_event = log_run_event(run.id, "run_resumed", resume_at)

    changeset = run.cast({
      finished:       "false",
      actual_seconds: nil,
      finished_at:    nil,
    })
    changeset = Repo.update(changeset)

    if changeset.valid?
      SocketService.broadcast(run_event.instance)
    end

    changeset
  end

  def reset_run(run : Run, reset_at : Time = Time.utc)
    return unless run.started_at
    run_event = log_run_event(run.id, "run_reset", reset_at)

    changeset = run.cast({
      finished:       "false",
      actual_seconds: nil,
      started_at:     nil,
      finished_at:    nil,
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
      run_id:      run_id,
      type:        type,
      occurred_at: timestamp,
    })
    Repo.insert(run_event)
  end
end
