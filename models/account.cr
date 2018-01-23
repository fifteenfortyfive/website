require "crypto/bcrypt/password"

class Account < Crecto::Model
  schema "accounts" do
    field :id, Int32, primary_key: true
    field :username, String
    field :encrypted_password, String

    field :password, String, virtual: true
  end

  def password=(new_password : String)
    @encrypted_password = Crypto::Bcrypt::Password.create(new_password).to_s
    @password = new_password
  end

  def password_matches?(other_password : String)
    Crypto::Bcrypt::Password.new(@encrypted_password.not_nil!) == other_password
  end
end
