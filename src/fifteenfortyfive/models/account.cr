require "crypto/bcrypt/password"

class Account < Crecto::Model
  schema "accounts" do
    field :username, String
    field :encrypted_password, String
    field :discord, String
    field :twitch, String
    field :twitter, String
    field :timezone, String
    field :admin, Bool
    field :avatar_object_id, String

    field :password, String, virtual: true

    has_one :runner_submission, RunnerSubmission
    has_one :commentator_submission, CommentatorSubmission
  end


  validate_required :username
  validate_required :discord
  validate_required :twitch


  def password=(new_password : String)
    @encrypted_password = Crypto::Bcrypt::Password.create(new_password).to_s
    @password = new_password
  end

  def password_matches?(other_password : String)
    Crypto::Bcrypt::Password.new(@encrypted_password.not_nil!) == other_password
  end
end
