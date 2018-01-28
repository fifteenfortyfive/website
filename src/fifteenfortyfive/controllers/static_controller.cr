module StaticController
  extend self

  def index(env)
    render_view "static/index"
  end
end
