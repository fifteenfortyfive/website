require "../../contexts/accounts"

class Admin::RunSubmissionsController < AppController
  def index
    event = Events.get_event!(url_params["event_id"])
    submissions = Events.list_run_submissions(Query.
      where(event_id: event.id, revoked: "false").
      preload([:account, :game]).
      order_by("created_at ASC")
    )

    render("admin/run_submissions/index.html.j2", {
      "event" => event,
      "submissions" => submissions
    })
  end

  def accept
    submission = Events.get_run_submission!(url_params["submission_id"])
    Events.accept_run_submission(submission)
    redirect_to("/admin/events/#{url_params["event_id"]}/submissions")
  end

  def unaccept
    submission = Events.get_run_submission!(url_params["submission_id"])
    Events.unaccept_run_submission(submission)
    redirect_to("/admin/events/#{url_params["event_id"]}/submissions")
  end
end
