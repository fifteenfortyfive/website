get "/register" do |env|
  # Users must be signed in to register for the event.
  unless env.current_user?
    env.redirect("/accounts/signin?redirect=/register")
    next
  end

  render "src/views/registrations/index.slang", "src/views/_layout.slang"
end


get "/register/runner" do |env|
  render "src/views/registrations/runner.slang", "src/views/_layout.slang"
end

post "/register/runner/submit" do |env|
  json_params = env.params.json

  # Create the parent submission
  submission = Submission.new
  submission.max_games  = json_params["max_games"].as(String)
  submission.max_time   = json_params["max_time"].as(String)
  submission.pair       = json_params["max_time"].as(String)
  submission.avoid      = json_params["avoid"].as(String)
  submission.account    = env.current_user
  changeset = Repo.insert(submission)
  unless changeset.valid?
    halt(env, status_code: 422, response: "Failed to save submissions")
  end

  submission.id = changeset.instance.id


  # Add each game submission individually
  json_params["games"].as(Array(JSON::Type)).each do |game_json|
    game_json = game_json.as(Hash(String, JSON::Type))
    game = Repo.get_by(Game, name: game_json["name"].as(String))
    next unless game

    sg = SubmissionGame.new
    sg.game = game
    sg.pb = game_json["pb"].as(String)
    sg.estimate = game_json["est"].as(String)
    sg.submission = submission
    Repo.insert(sg)
  end


  :success
end


get "/register/commentator" do |env|
  render "src/views/registrations/commentator.slang", "src/views/_layout.slang"
end

post "/register/commentator/submit" do |env|
  env.redirect("/register")
end
