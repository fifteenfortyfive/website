require "random/secure"

module Accounts
  class Session < Crecto::Model
    schema "acc_sessions" do
      field :id, String, primary_key: true
      field :expires_at, Time
      field :active, Bool, default: false

      belongs_to :account, Account
    end

    def valid?
      if e = @expires_at
        @active && e > Time.now
      else
        @active
      end
    end
  end
end
