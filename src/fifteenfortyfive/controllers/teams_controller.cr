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

  def show(env)
    unless env.feature_flags["teams"].enabled || (env.current_user? && env.current_user.admin)
      env.redirect("/")
      return
    end

    team = team_from_slug(env.params.url["slug"])
    unless team
      env.redirect("/")
      return
    end

    captain = Repo.get(Account, team.captain_id)
    runs = Repo.all(Run,
      Query.where(team_id: team.id),
      preload: [:game, :runner]
    )

    render_view "teams/show"
  end

  def edit(env)
    team = team_from_slug(env.params.url["slug"])
    unless team
      env.redirect("/")
      return
    end

    unless user_can_edit?(env.current_user?, team)
      render_error(env, 403, "Forbidden")
      return
    end

    captain = Repo.get(Account, team.captain_id)
    runs = Repo.all(Run,
      Query.where(team_id: team.id),
      preload: [:game, :runner]
    )

    render_view "teams/edit"
  end

  def update(env)
    team = team_from_slug(env.params.url["slug"])
    unless team
      env.redirect("/teams/#{env.params.url["slug"]}/edit")
      return
    end

    unless user_can_edit?(env.current_user?, team)
      render_error(env, 403, "Forbidden")
      return
    end

    team.name = env.params.body["name"]
    team.slug = env.params.body["slug"]

    changeset = Repo.update(team)

    if changeset.valid?
      env.redirect("/teams/#{team.slug}")
    else
      env.redirect("/teams/#{team.slug}/edit")
    end
  end

  def schedule(env)
    team = team_from_slug(env.params.url["slug"])
    unless team
      env.redirect("/")
      return
    end

    unless user_can_edit?(env.current_user?, team)
      render_error(env, 403, "Forbidden")
      return
    end

    captain = Repo.get(Account, team.captain_id)
    runs = Repo.all(Run,
      Query.where(team_id: team.id),
      preload: [:game, :runner]
    )

    render_view "teams/schedule"
  end

  def update_schedule(env)
    team = team_from_slug(env.params.url["slug"])
    unless team
      env.redirect("/teams/#{env.params.url["slug"]}/edit")
      return
    end

    unless user_can_edit?(env.current_user?, team)
      render_error(env, 403, "Forbidden")
      return
    end

    team.name = env.params.body["name"]
    team.slug = env.params.body["slug"]

    changeset = Repo.update(team)

    if changeset.valid?
      env.redirect("/teams/#{team.slug}")
    else
      env.redirect("/teams/#{team.slug}/schedule")
    end
  end


  private def team_from_slug(slug)
    Repo.get_by(Team, slug: slug)
  end

  private def user_can_edit?(user, team)
    case user
    when nil
      false
    when .admin
      true
    else
      team.captain_id == user.id
    end
  end
end
