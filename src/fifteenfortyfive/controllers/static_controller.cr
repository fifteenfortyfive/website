class StaticController < AppController
  def app_root
    render("static/app_root.html")
  end
end
