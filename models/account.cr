require "crypto/bcrypt/password"

class Account < Crecto::Model
  schema "accounts" do
    field :username, String
    field :encrypted_password, String

    field :password, String, virtual: true
  end

  def password=(new_password : String)
    @encrypted_password = Crypto::Bcrypt::Password.create(new_password).digest
    @password = new_password
  end
end
