module RunsController
  extend BaseController
  extend self

  def edit(env)
    unless env.current_user?
      env.redirect("/signin?redirect=/runs/edit")
      return
    end

    runs = Repo.all(Run, Query.where(account_id: env.current_user.id).where("team_id IS NOT NULL"), preload: [:game])
    render_view "runs/edit"
  end

  def update(env)
    unless env.current_user?
      env.redirect("/signin?redirect=/runs/edit")
      return
    end

    run_ids = env.params.json.keys

    runs = Repo.all(Run, Query.where(id: run_ids).where(account_id: env.current_user.id))

    multi = Multi.new
    runs.each do |run|
      run_data = env.params.json[run.id.to_s].as(Hash(String, JSON::Any))

      run.update_pb(run_data["pb"].as_s)
      run.update_estimate(run_data["est"].as_s)

      multi.update(run)
    end
    Repo.transaction(multi)

    env.redirect("/runs/edit")
  end
end
