require "../../contexts/events"

class API::EventsController < AppController
  def get_existing_submission
    user = @context.current_user
    submission = Events.list_runner_submissions(
      Query.where(event_id: url_params["event_id"], account_id: "#{user.id}") \
      .preload(:run_submissions, Query.preload(:game).order_by("rank ASC"))
      .order_by("created_at DESC")
    ).first?

    unless submission
      render_json({
        exists: false,
        data: {
          user: {
            username: user.username,
            twitter: user.twitter,
            twitch: user.twitch,
            discord_username: user.discord_username,
            discord_discriminator: user.discord_discriminator
          }
        }
      })
      return
    end

    render_json({
      exists: true,
      data: {
        id: submission.id,
        event_id: submission.event_id,
        max_games: submission.max_games,
        max_time: submission.max_time,
        pair_with: submission.pair_with,
        avoid: submission.avoid,
        captain: submission.captain,
        games: submission.run_submissions.map{ |run| {
          name: run.game.name,
          pb: Events.seconds_to_string(run.pb_seconds.as(Int)),
          est: Events.seconds_to_string(run.est_seconds.as(Int))
        }},
        user: {
          username: user.username,
          twitter: user.twitter,
          twitch: user.twitch,
          discord_username: user.discord_username,
          discord_discriminator: user.discord_discriminator
        }
      }
    })
  end

  def submit
    delete_existing_submissions

    account_id = @context.current_user.id
    event_id = url_params["event_id"]

    submission = Events::RunnerSubmission.new
    submission.account_id = account_id
    submission.event_id = event_id.to_i
    submission.max_games = json_params["maxGames"]?.try(&.as_s?.try(&.to_i))
    submission.max_time = json_params["maxTime"]?.try(&.as_s?)
    submission.pair_with = json_params["pairWith"]?.try(&.as_s?)
    submission.avoid = json_params["avoid"]?.try(&.as_s?)
    submission.captain = json_params["captain"]?.try(&.as_bool) || false

    submission = Events.create_runner_submission(submission).instance

    runs_params = json_params["games"].as_a

    rank = 1
    runs_params.each do |run_params|
      game = Inventory.list_games(Query.where(name: run_params["name"].as_s)).first

      run_submission = Events::RunSubmission.new
      run_submission.account_id = account_id
      run_submission.event_id = event_id
      run_submission.game_id = game.id
      run_submission.runner_submission_id = submission.id
      run_submission.pb_seconds = Events.convert_time_string_to_seconds!(run_params["pb"].as_s)
      run_submission.est_seconds = Events.convert_time_string_to_seconds!(run_params["est"].as_s)
      run_submission.rank = rank

      Events.create_run_submission(run_submission)
      rank += 1
    end

    render_json({
      status: :ok
    })
  end


  private def delete_existing_submissions
    submissions = Events.list_runner_submissions(
      Query.where(
        account_id: @context.current_user.id,
        event_id: url_params["event_id"]
      )
    )

    submissions.each do |submission|
      run_submissions = Events.list_run_submissions(Query.where(runner_submission_id: submission.id))
      run_submissions.each do |run|
        Events.delete_run_submission(run)
      end

      # Associated run submissions are automatically deleted by CASCADE
      Events.delete_runner_submission(submission)
    end
  end
end
