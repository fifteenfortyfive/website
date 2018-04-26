require "crypto/bcrypt/password"

class AccountTeam < Crecto::Model
  schema "accounts_teams" do
    belongs_to :account, Account
    belongs_to :team, Team
  end
end
