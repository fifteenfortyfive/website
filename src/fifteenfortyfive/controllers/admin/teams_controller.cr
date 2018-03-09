module Admin::TeamsController
  extend BaseController
  extend self

  def index(env)
    submissions = Repo.all(GameSubmission, Query.order_by("game_id"), preload: [:game, :account])
    existing_teams = Repo.all(Team, preload: [:runs])

    available_runs_json = submissions_json(submissions)

    render_view "admin/teams/index"
  end


  def save(env)
    teams_json = JSON.parse(env.request.body.not_nil!)
    submissions = Repo.all(GameSubmission).index_by{ |gs| gs.id.to_s }

    multi = Multi.new
    teams_json.each do |team_json|
      team = Team.new
      team.name = team_json["name"].as_s
      team.color = team_json["color"].as_s

      changeset = Repo.insert(team)
      if changeset.valid?
        team = changeset.instance
      else
        next
      end

      # Create runs for the submissions used on the team
      submission_ids = team_json["runs"].to_a.map{ |r| r.to_s }
      submission_ids.each do |sub_id|
        sub = submissions[sub_id]
        run = Run.new
        run.runner_id = sub.account_id
        run.game_id   = sub.game_id
        run.team_id   = team.id
        run.pb        = sub.pb
        run.estimate  = sub.estimate

        multi.insert(run)
      end
    end

    Repo.transaction(multi)
  end



  private def submissions_json(submissions)
    JSON.build do |json|
      json.array do
        submissions.each do |sub|
          json.object do
            json.field "id", sub.id
            json.field "runner", sub.account.username
            json.field "runner_id", sub.account.id
            json.field "game", sub.game.name
            json.field "pb", sub.pb
            json.field "estimate", sub.estimate
            json.field "priority", sub.priority
          end
        end
      end
    end
  end
end
