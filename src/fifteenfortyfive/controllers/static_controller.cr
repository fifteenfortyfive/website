class StaticController < AppController
  def index
    render("static/index.html.j2")
  end

  def volunteer
    render("static/volunteer.html.j2")
  end
end
