module StaticController
  extend self

  def index(env)
    runner_submissions = Repo.all(RunnerSubmission).select{ |rs| rs.revoked == false }
    commentator_submissions = Repo.all(CommentatorSubmission).select{ |cs| cs.revoked == false }

    live_streams = live_runner_streams
    games = games_for_streams(live_streams.values)
    Template.render(env, "static/index.html.j2")
  end

  def volunteer(env)
    Template.render(env, "static/volunteer.html.j2")
  end

  def event_calendar(env)
    Template.render(env, "static/event-calendar.html.j2")
  end

  protected def live_runner_streams
    runners = Repo.all(AccountTeam, preload: [:account, :team]).uniq(&.account)
    indexed_streams = Hash(AccountTeam, StreamStatusService::Stream).new
    runners.each do |runner|
      if  (stream = StreamStatusService.statuses[runner.account.id]?) &&
          stream.in_community?(Constants::TWITCH_COMMUNITY_ID)
        indexed_streams[runner] = stream
      end
    end

    indexed_streams
  end

  protected def games_for_streams(streams)
    twitch_game_ids = streams.map(&.game_id)

    Repo.all(Game, Query.where(twitch_id: twitch_game_ids)).index_by(&.twitch_id)
  end
end
