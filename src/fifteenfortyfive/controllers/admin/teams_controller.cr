module Admin::TeamsController
  extend BaseController
  extend self

  def index(env)
    submissions = Repo.all(Run, Query.order_by("game_id"), preload: [:game, :runner])
    existing_teams = Repo.all(Team, preload: [:runs])

    available_runs_json = submissions_json(submissions)
    existing_teams_json = teams_json(existing_teams)

    render_view "admin/teams/index"
  end


  def save(env)
    teams_json = JSON.parse(env.request.body.not_nil!)

    teams_json.each do |team_json|
      team =
        if existing_id = team_json["id"]?
          unless existing_id.as_s.empty?
            Repo.get(Team, existing_id.as_s)
          end
        end
      team ||= Team.new
      team.name = team_json["name"].as_s
      team.color = team_json["color"].as_s
      if team.id
        team = Repo.update(team).instance
      else
        team = Repo.insert(team).instance
      end

      # Create runs for the submissions used on the team
      submission_ids = team_json["runs"].to_a.map{ |r| r.to_s }
      Repo.update_all(Run, Query.where(team_id: team.id), { updated_at: Time.now, team_id: nil })
      Repo.update_all(Run, Query.where(id: submission_ids), { updated_at: Time.now, team_id: team.id })
    end
  end

  def schedules(env)
    teams = Repo.all(Team, Query.order_by("id ASC"), preload: [:captain]).index_by{ |t| t.id }
    runs = Repo.all(Run,
      Query.where(team_id: teams.keys).order_by("runs.schedule_index ASC"),
      preload: [:game, :runner]
    )

    runs_by_team = runs.group_by{ |r| teams[r.team_id] }

    render_view "admin/teams/schedules"
  end



  private def submissions_json(submissions)
    JSON.build do |json|
      json.array do
        submissions.each do |sub|
          json.object do
            json.field "id", sub.id
            json.field "runner", sub.runner.username
            json.field "runner_id", sub.runner.id
            json.field "game", sub.game.name
            json.field "pb", sub.pb
            json.field "estimate", sub.estimate
            json.field "priority", sub.priority
          end
        end
      end
    end
  end

  private def teams_json(teams)
    JSON.build do |json|
      json.array do
        teams.each do |team|
          json.object do
            json.field "id", team.id
            json.field "name", team.name
            json.field "color", team.color
            json.field "runs", team.runs.map(&.id)
          end
        end
      end
    end
  end
end
