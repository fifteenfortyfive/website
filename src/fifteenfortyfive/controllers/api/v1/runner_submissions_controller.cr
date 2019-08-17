require "../../../contexts/events"
require "../../errors"

class API::RunnerSubmissionsController < AppController
  def get
    event_id = url_params["event_id"]
    account = @context.current_user

    submission = Events.get_runner_submission_for_account(event_id, account.id)
    unless submission
      render_error_json(Errors::NotFound)
      return
    end

    runs = Events.list_run_submissions_for_account(event_id, account.id)

    render_json({
      submission: submission,
      runs: runs
    })
  end

  def create
    event_id = url_params["event_id"]
    account = @context.current_user

    if existing = Events.get_runner_submission_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "account_id" => account.id.to_json,
      "event_id" => event_id
    })

    changeset = Events.create_runner_submission(params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      submission: changeset.instance
    })
  end

  def update
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Events.get_runner_submission_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "account_id" => account.id.to_json,
      "event_id" => event_id
    })

    changeset = Events.update_runner_submission(existing, params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      submission: changeset.instance
    })
  end

  def delete
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Events.get_runner_submission_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    Events.delete_runner_submission(existing)

    render_json({
      processed: true
    })
  end

  def revoke
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Events.get_runner_submission_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Events.update_runner_submission(existing, { revoked: "true" })

    render_json({
      submission: changeset.instance
    })
  end

  def unrevoke
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Events.get_runner_submission_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Events.update_runner_submission(existing, { revoked: "false" })

    render_json({
      submission: changeset.instance
    })
  end



  def runs_index
    event_id = url_params["event_id"]
    account = @context.current_user

    render_json({
      runs: Events.list_run_submissions_for_account(event_id, account.id)
    })
  end

  def runs_create
    event_id = url_params["event_id"]
    account = @context.current_user
    runner = Events.ensure_runner_submission!(event_id, account.id)

    params = json_params.as_h.merge({
      "event_id" => event_id,
      "account_id" => account.id.to_json,
      "runner_submission_id" => runner.id
    })

    changeset = Events.create_run_submission(params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      run: changeset.instance
    })
  end

  def runs_update
    event_id = url_params["event_id"]
    account = @context.current_user
    run_id = url_params["run_id"]
    runner = Events.ensure_runner_submission!(event_id, account.id)

    unless existing = Events.get_run_submission(run_id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "event_id" => event_id,
      "account_id" => account.id.to_json,
      "runner_submission_id" => runner.id
    })

    changeset = Events.update_run_submission(existing, params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      run: changeset.instance
    })
  end

  def runs_delete
    run_id = url_params["run_id"]

    unless existing = Events.get_run_submission(run_id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Events.delete_run_submission(existing)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      processed: true
    })
  end
end
