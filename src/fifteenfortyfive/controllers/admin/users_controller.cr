class Admin::UsersController < AppController
  def index
    accounts = Accounts.list_accounts(Query.order_by("created_at ASC"))
    render("admin/accounts/index.html.j2", {
      "accounts" => accounts
    })
  end
end
