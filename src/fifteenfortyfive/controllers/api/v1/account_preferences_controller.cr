require "../../../contexts/accounts"
require "../../errors"

class API::AccountPreferencesController < AppController
  def get
    account = @context.current_user

    render_json({
      account_preferences: account.preferences,
      descriptions: Accounts::AccountPreferences::PREFERENCE_DESCRIPTIONS
    })
  end

  def update
    account = @context.current_user

    new_prefs = Accounts::AccountPreferences.from_json(body_content)
    Accounts.update_account_preferences(account, new_prefs)

    render_json({
      account_preferences: account.preferences,
      descriptions: Accounts::AccountPreferences::PREFERENCE_DESCRIPTIONS
    })
  end
end
