require "../../../contexts/events"
require "../../errors"

class API::SubmissionsController < AppController
  def index
    event_id = url_params["event_id"]
    query = Query.where(event_id: event_id)

    if run_ids = query_params["run_ids"]?
      query = query.where(id: run_ids.split(','))
    end

    render_json({
      runs: Submissions.list_submissions(query),
    })
  end

  def get
    unless submission_id = url_params["submission_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless submission = Submissions.get_submission(submission_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      submission: submission,
    })
  end
end
