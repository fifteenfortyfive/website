module Admin::AccountsController
  extend BaseController
  extend self

  def index(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    accounts = Repo.all(Account)
    render_view "admin/accounts/index"
  end
end
