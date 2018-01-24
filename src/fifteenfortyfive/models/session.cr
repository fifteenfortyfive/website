require "random/secure"

class Session < Crecto::Model
  schema "sessions" do
    field :id, String, primary_key: true
    field :expires_at, Time
    field :active, Bool, default: false

    belongs_to :account, Account
  end

  # Sessions expire after 1 month
  EXPIRATION_TIME = Time::Span.new(31, 0, 0, 0)

  def self.build_for(account : Account)
    session = self.new
    session.id = Random::Secure.hex
    session.account = account
    session.expires_at = Time.now + EXPIRATION_TIME
    session.active = true
    session
  end

  def valid?
    if e = @expires_at
      @active && e > Time.now
    else
      @active
    end
  end
end
