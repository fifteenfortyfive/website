class Admin::V2::AppController < AppController
  def index
    render("admin/v2/index.html.j2")
  end
end
