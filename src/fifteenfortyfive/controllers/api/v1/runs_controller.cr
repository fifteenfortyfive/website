require "../../../contexts/events"
require "../../errors"

class API::RunsController < AppController
  ALLOWED_PRELOADS = {
    "team"       => :team,
    "account"    => :account,
    "category"   => :category,
    "game"       => :game,
    "run_events" => :run_events,
  }

  def index
    requested_preloads = query_params["embeds"]?.try(&.split(',')) || [] of String
    preloads = requested_preloads.map { |p| ALLOWED_PRELOADS[p]? }.compact.uniq
    query = Query.preload([:run_events] + preloads)
    has_selector = false

    if event_id = query_params["event_id"]?
      has_selector = true
      query = query.where(event_id: event_id)
    end

    if run_ids = query_params["run_ids"]?
      has_selector = true
      query = query.where(id: run_ids.split(','))
    end

    if team_id = query_params["team_id"]?
      has_selector = true
      query = query.where(team_id: team_id)
    end

    if account_id = query_params["account_id"]?
      has_selector = true
      query = query.where(account_id: account_id)
    end

    unless has_selector
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      runs: Events.list_runs(query),
    })
  end

  def get
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(run_id, Query.preload([:run_events]))
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      run: run,
    })
  end

  def start
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(
             run_id,
             Query
               .where(account_id: @context.current_user.id.to_s)
               .preload([:run_events])
           )
      render_error_json(Errors::NotFound)
      return
    end

    Events.start_run(run, Time.utc_now)

    render_json({
      run: run,
    })
  end

  def finish
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(
             run_id,
             Query
               .where(account_id: @context.current_user.id.to_s)
               .preload([:run_events])
           )
      render_error_json(Errors::NotFound)
      return
    end

    Events.finish_run(run, Time.utc_now)

    render_json({
      run: run,
    })
  end

  def resume
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(
             run_id,
             Query
               .where(account_id: @context.current_user.id.to_s)
               .preload([:run_events])
           )
      render_error_json(Errors::NotFound)
      return
    end

    Events.resume_run(run, Time.utc_now)

    render_json({
      run: run,
    })
  end

  def reset
    unless run_id = url_params["run_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless run = Events.get_run(
             run_id,
             Query
               .where(account_id: @context.current_user.id.to_s)
               .preload([:run_events])
           )
      render_error_json(Errors::NotFound)
      return
    end

    Events.reset_run(run, Time.utc_now)

    render_json({
      run: run,
    })
  end
end
