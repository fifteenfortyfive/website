module TeamsController
  extend BaseController
  extend self

  def index(env)
    teams = Repo.all(Team, preload: [:captain]).index_by{ |t| t.id }
    runs = Repo.all(Run,
      Query.where(team_id: teams.keys),
      preload: [:game, :runner]
    )

    runs_by_team = runs.group_by{ |r| teams[r.team_id] }

    render_view "teams/index"
  end
end
