require "../../../contexts/events"
require "../../errors"

class API::Admin::SchedulingController < AppController
  def get_event_data
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

  def schedule
    unless event_id = url_params["event_id"]?
      return render_error_json(Errors::BadRequest)
    end

    schedules = Schedules.list_schedules(Query.where(event_id: event_id))

    unless schedules && schedules.size > 0
      return render_error_json(Errors::NotFound)
    end

    render_json({
      schedule: schedules.first,
    })
  end

  def all_runs
    unless event_id = url_params["event_id"]?
      return render_error_json(Errors::BadRequest)
    end

    runs = Events.list_runs_for_event(event_id)

    render_json({
      runs: runs,
    })
  end
end
