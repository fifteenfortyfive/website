require "crinja"
require "crypto/bcrypt/password"
require "../contexts/accounts/account_preferences"

@[Crinja::Attributes]
class Account < Crecto::Model
  include Crinja::Object::Auto

  schema "accounts" do
    field :username, String
    field :bio, String
    field :discord_username, String
    field :discord_discriminator, String
    field :twitch, String
    field :twitter, String
    field :timezone, String
    field :admin, Bool
    field :avatar_object_id, String

    @[Crinja::Attribute(ignore: true)]
    field :encrypted_password, String
    @[Crinja::Attribute(ignore: true)]
    field :password, String, virtual: true

    field :preference_overrides, Json
  end


  validate_required :username
  validate_required :discord_username
  validate_required :discord_discriminator
  validate_length :bio, max: 140


  def password=(new_password : String)
    @encrypted_password = Crypto::Bcrypt::Password.create(new_password).to_s
    @password = new_password
  end

  def password_matches?(other_password : String)
    Crypto::Bcrypt::Password.new(@encrypted_password.not_nil!) == other_password
  end

  def avatar_object_id
    @avatar_object_id || "default-avatar"
  end

  @preferences : Accounts::AccountPreferences?
  def preferences
    @preferences ||= begin
      if json = @preference_overrides
        Accounts::AccountPreferences.from_json(json.to_json)
      else
        Accounts::AccountPreferences::DEFAULT
      end
    end
  end

  def preferences=(new_prefs : Accounts::AccountPreferences)
    @preferences = new_prefs
  end

  def to_json(json : JSON::Builder)
    json.raw(self.to_h.to_json)
  end

  def to_h(is_admin : Bool = false)
    {
      "id" => self.id,
      "username" => self.username,
      "bio" => self.bio,
      "discord_username" => is_admin ? self.discord_username : nil,
      "discord_discriminator" => is_admin ? self.discord_discriminator : nil,
      "twitch" => self.preferences.show_twitch ? self.twitch : nil,
      "twitter" => self.preferences.show_twitter ? self.twitter : nil,
      "timezone" => self.timezone,
      "admin" => self.admin,
      "avatar_object_id" => self.avatar_object_id
    }
  end
end
