module AdminController
  extend BaseController
  extend self

  def index(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    render_view "admin/index"
  end
end
