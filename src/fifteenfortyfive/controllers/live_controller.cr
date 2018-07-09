module LiveController
  extend BaseController
  extend self

  def runner(env)
    unless env.current_user? && env.current_user
      render_404
      return
    end

    runs = Repo.all(Run, Query.where(account_id: env.current_user.id), preload: [:game])
    runs = runs.reject(&.team_id.nil?)

    team_runs =
      if runs.size > 0
        team_id = runs.first.team_id

        Repo.all(Run,
          Query.where(team_id: team_id).order_by("schedule_index ASC"),
          preload: [:game, :runner]
        )
      else
        [] of Run
      end

    render_view "live/runner"
  end
end
