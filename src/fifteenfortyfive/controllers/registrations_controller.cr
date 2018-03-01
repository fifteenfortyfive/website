module RegistrationsController
  extend BaseController
  extend self

  def index(env)
    # Users must be signed in to register for the event.
    unless env.current_user?
      env.redirect("/signin?redirect=/register")
      return
    end

    runner_submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
    runner_submission = nil if runner_submission.try(&.revoked)
    commentator_submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
    commentator_submission = nil if commentator_submission.try(&.revoked)
    render_view "registrations/index"
  end
end
