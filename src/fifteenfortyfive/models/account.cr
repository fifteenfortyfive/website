require "crinja"
require "crypto/bcrypt/password"

@[Crinja::Attributes]
class Account < Crecto::Model
  include Crinja::Object::Auto

  schema "accounts" do
    field :username, String
    field :encrypted_password, String
    field :discord_username, String
    field :discord_discriminator, String
    field :twitch, String
    field :twitter, String
    field :timezone, String
    field :admin, Bool
    field :avatar_object_id, String

    @[Crinja::Attribute(ignore: true)]
    field :password, String, virtual: true

    has_one :runner_submission, RunnerSubmission
    has_one :commentator_submission, CommentatorSubmission

    # This is _almost_ a `has_many :through`, but it's possible that runners
    # get added without having submissions. Since `Run` has a direct
    # association to the accounts, this inverse association avoids that issue.
    has_many :runs, Run

    has_many :account_teams, AccountTeam
  end


  validate_required :username
  validate_required :discord_username
  validate_required :discord_discriminator


  def password=(new_password : String)
    @encrypted_password = Crypto::Bcrypt::Password.create(new_password).to_s
    @password = new_password
  end

  def password_matches?(other_password : String)
    Crypto::Bcrypt::Password.new(@encrypted_password.not_nil!) == other_password
  end
end
