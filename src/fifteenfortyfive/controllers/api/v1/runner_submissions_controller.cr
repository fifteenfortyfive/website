require "../../../contexts/events"
require "../../errors"

class API::RunnerSubmissionsController < AppController
  def get
    unless submission_id = url_params["submission_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless submission = Events.get_runner_submission(submission_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      submission: submission
    })
  end

  def create
    account = @context.current_user

    unless event_id = url_params["event_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    params = json_params
    params["account_id"] = account.id
    params["event_id"] = event_id

    submission = Events.create_runner_submission(params)

    unless submission.valid?
      render_error_json(Errors::Unprocessable)
      return
    end

    render_json({
      submission: submission.instance
    })
  end
end
