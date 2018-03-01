module RunnerSubmissionsController
  extend BaseController
  extend self

  def show(env)
    submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
    render_view "registrations/runner"
  end

  def create(env)
    unless env.feature_flags["open_signups"].enabled
      env.redirect("/")
      return
    end

    json_params = env.params.json

    # Create the parent submission
    submission = RunnerSubmission.new
    submission.max_games  = json_params["max_games"].as(String)
    submission.max_time   = json_params["max_time"].as(String)
    submission.pair       = json_params["pair"].as(String)
    submission.avoid      = json_params["avoid"].as(String)
    submission.captain    = json_params["captain"].as(Bool)
    submission.games_json = json_params["games"].to_json
    submission.account    = env.current_user

    changeset =
      if submission_id = json_params["submission_id"]?.as?(String)
        submission.id = submission_id.to_i
        Repo.update(submission)
      else
        Repo.insert(submission)
      end

    unless changeset.valid?
      render_error(env, 422, "Failed to save submissions")
      return
    end
  end

  def destroy(env)
    submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
    if submission
      submission.revoked = true
      Repo.update(submission)
    end

    env.redirect("/register")
  end
end
