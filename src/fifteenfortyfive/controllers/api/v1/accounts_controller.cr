require "../../../contexts/accounts"
require "../../errors"

class API::AccountsController < AppController
  def index
    accounts =
      if account_ids = query_params["account_ids"]?
        Accounts.list_accounts(Query.where(id: account_ids.split(',')))
      else
        Accounts.list_accounts()
      end

    render_json({
      accounts: accounts
    })
  end

  def get
    unless account_id = url_params["account_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless account = Accounts.get_account(account_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      account: account
    })
  end
end
