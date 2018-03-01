module CommentatorSubmissionsController
  extend BaseController
  extend self

  def show(env)
    submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
    render_view "registrations/commentator"
  end

  def create(env)
    # Create the parent submission
    submission = CommentatorSubmission.new
    submission.games        = env.params.body["games"].as(String)
    submission.experience   = env.params.body["experience"].as(String)
    submission.availability = env.params.body["availability"].as(String)
    submission.account      = env.current_user

    changeset =
      if submission_id = env.params.body["submission_id"]?.as?(String)
        submission.id = submission_id.to_i
        Repo.update(submission)
      else
        Repo.insert(submission)
      end

    unless changeset.valid?
      render_error(env, 422, "Failed to save submissions")
      return
    end

    env.redirect("/register")
  end

  def destroy(env)
    submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
    if submission
      submission.revoked = true
      Repo.update(submission)
    end

    env.redirect("/register")
  end
end
