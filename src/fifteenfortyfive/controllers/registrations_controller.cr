get "/register" do |env|
  # Users must be signed in to register for the event.
  unless env.current_user?
    env.redirect("/accounts/signin?redirect=/register")
    next
  end

  runner_submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
  runner_submission = nil if runner_submission.try(&.revoked)
  commentator_submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
  commentator_submission = nil if commentator_submission.try(&.revoked)
  render "src/fifteenfortyfive/views/registrations/index.slang", "src/fifteenfortyfive/views/_layout.slang"
end


get "/register/runner" do |env|
  submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
  render "src/fifteenfortyfive/views/registrations/runner.slang", "src/fifteenfortyfive/views/_layout.slang"
end

post "/register/runner/submit" do |env|
  json_params = env.params.json

  # Create the parent submission
  submission = RunnerSubmission.new
  submission.max_games  = json_params["max_games"].as(String)
  submission.max_time   = json_params["max_time"].as(String)
  submission.pair       = json_params["pair"].as(String)
  submission.avoid      = json_params["avoid"].as(String)
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
    halt(env, status_code: 422, response: "Failed to save submissions")
  end

  :success
end

post "/register/runner/revoke" do |env|
  submission = Repo.get_association(env.current_user, :runner_submission).as?(RunnerSubmission)
  if submission
    submission.revoked = true
    Repo.update(submission)
  end

  env.redirect("/register")
end



get "/register/commentator" do |env|
  submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
  render "src/fifteenfortyfive/views/registrations/commentator.slang", "src/fifteenfortyfive/views/_layout.slang"
end

post "/register/commentator/submit" do |env|
  # Create the parent submission
  submission = CommentatorSubmission.new
  submission.games        = env.params.body["games"].as(String)
  submission.experience   = env.params.body["experience"].as(String)
  submission.availability = env.params.body["availability"].as(String)
  submission.account      = env.current_user

  changeset =
    if submission_id = env.params.body["submission_id"]?.as?(String)
      puts submission_id
      submission.id = submission_id.to_i
      Repo.update(submission)
    else
      Repo.insert(submission)
    end

  unless changeset.valid?
    halt(env, status_code: 422, response: "Failed to save submissions")
  end

  env.redirect("/register")
end

post "/register/commentator/revoke" do |env|
  submission = Repo.get_association(env.current_user, :commentator_submission).as?(CommentatorSubmission)
  if submission
    submission.revoked = true
    Repo.update(submission)
  end

  env.redirect("/register")
end
