module Admin::FeatureFlagsController
  extend BaseController
  extend self

  def index(env)
    render_view "admin/feature_flags/index"
  end

  def enable(env)
    flag = env.feature_flags[env.params.url["flag_name"]]
    flag.enabled = true
    Repo.update(flag)

    env.redirect("/admin/feature_flags")
  end

  def disable(env)
    flag = env.feature_flags[env.params.url["flag_name"]]
    flag.enabled = false
    Repo.update(flag)

    env.redirect("/admin/feature_flags")
  end
end
