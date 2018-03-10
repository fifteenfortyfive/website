module TeamsController
  extend BaseController
  extend self

  def index(env)
    unless env.feature_flags["teams"].enabled || (env.current_user? && env.current_user.admin)
      env.redirect("/")
      return
    end

    teams = Repo.all(Team, preload: [:captain]).index_by{ |t| t.id }
    runs = Repo.all(Run,
      Query.where(team_id: teams.keys),
      preload: [:game, :runner]
    )

    runs_by_team = runs.group_by{ |r| teams[r.team_id] }

    render_view "teams/index"
  end
end
