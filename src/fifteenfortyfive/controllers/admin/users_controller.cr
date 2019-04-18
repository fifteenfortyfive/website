class Admin::UsersController < AppController
  def index
    users = Accounts.list_accounts()
    render("admin/users/index.html.j2", {
      "users" => users
    })
  end
end
