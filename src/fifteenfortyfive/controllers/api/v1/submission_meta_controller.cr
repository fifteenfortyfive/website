require "../../../contexts/events"
require "../../errors"

class API::SubmissionMetaController < AppController
  def get
    event_id = url_params["event_id"]
    account = @context.current_user

    submission = Submissions.get_submission_meta_for_account(event_id, account.id)
    unless submission
      render_error_json(Errors::NotFound)
      return
    end

    runs = Submissions.list_submissions_for_account(event_id, account.id)

    render_json({
      submission: submission,
      runs:       runs,
    })
  end

  def create
    event_id = url_params["event_id"]
    account = @context.current_user

    unless event = Events.get_event(event_id)
      render_error_json(Errors::BadRequest)
      return
    end

    unless Events.accepting_submissions?(event)
      render_error_json(Errors::Conflict)
      return
    end

    if existing = Submissions.get_submission_meta_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "account_id" => account.id.to_json,
      "event_id"   => event_id,
    })

    changeset = Submissions.create_submission_meta(params)
    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      submission: changeset.instance,
    })
  end

  def update
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Submissions.get_submission_meta_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "account_id" => account.id.to_json,
      "event_id"   => event_id,
    })

    changeset = Submissions.update_submission_meta(existing, params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      submission: changeset.instance,
    })
  end

  def delete
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Submissions.get_submission_meta_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    Submissions.delete_submission_meta(existing)

    render_json({
      processed: true,
    })
  end

  def revoke
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Submissions.get_submission_meta_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Submissions.update_submission_meta(existing, {revoked: "true"})

    render_json({
      submission: changeset.instance,
    })
  end

  def unrevoke
    event_id = url_params["event_id"]
    account = @context.current_user

    unless existing = Submissions.get_submission_meta_for_account(event_id, account.id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Submissions.update_submission_meta(existing, {revoked: "false"})

    render_json({
      submission: changeset.instance,
    })
  end

  def runs_index
    event_id = url_params["event_id"]
    account = @context.current_user

    render_json({
      runs: Submissions.list_submissions_for_account(event_id, account.id),
    })
  end

  def runs_create
    event_id = url_params["event_id"]
    account = @context.current_user

    unless event = Events.get_event(event_id)
      render_error_json(Errors::BadRequest)
      return
    end

    unless Events.accepting_submissions?(event)
      render_error_json(Errors::Conflict)
      return
    end

    meta = Submissions.ensure_submission_meta!(event_id, account.id)

    params = json_params.as_h.merge({
      "event_id"   => event_id,
      "account_id" => account.id.to_json,
      "meta_id"    => meta.id,
    })

    changeset = Submissions.create_submission(params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      run: changeset.instance,
    })
  end

  def runs_update
    event_id = url_params["event_id"]
    account = @context.current_user
    run_id = url_params["run_id"]
    meta = Submissions.ensure_submission_meta!(event_id, account.id)

    unless existing = Submissions.get_submission(run_id)
      render_error_json(Errors::BadRequest)
      return
    end

    params = json_params.as_h.merge({
      "event_id"   => event_id,
      "account_id" => account.id.to_json,
      "meta_id"    => meta.id,
    })

    changeset = Submissions.update_submission(existing, params)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      run: changeset.instance,
    })
  end

  def runs_delete
    run_id = url_params["run_id"]

    unless existing = Submissions.get_submission(run_id)
      render_error_json(Errors::BadRequest)
      return
    end

    changeset = Submissions.delete_submission(existing)

    unless changeset.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      processed: true,
    })
  end
end
