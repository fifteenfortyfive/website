module TeamsController
  extend BaseController
  extend self

  def index(env)
    render_view "teams/index"
  end
end
