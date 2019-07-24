require "crinja"
require "crypto/bcrypt/password"

module Accounts
  @[Crinja::Attributes]
  class Account < Crecto::Model
    include Crinja::Object::Auto

    schema "acc_accounts" do
      field :username, String
      field :bio, String
      field :discord_username, String
      field :discord_discriminator, String
      field :twitch, String
      field :twitter, String
      field :timezone, String
      field :admin, Bool, default: false, read_only: true
      field :avatar_object_id, String

      @[Crinja::Attribute(ignore: true)]
      field :encrypted_password, String
      @[Crinja::Attribute(ignore: true)]
      field :password, String, virtual: true

      field :preference_overrides, Json
    end


    validate_required :username
    validate_length   :username, min: 1
    validate_required :discord_username
    validate_required :discord_discriminator
    validate_length   :bio, max: 140


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

    @discord_tag : String?
    def discord_tag
      @discord_tag ||= String.build do |str|
        if preferences.show_discord_username
          str << discord_username
        end
        if preferences.show_discord_discriminator
          str << "#" << discord_discriminator
        end
      end
    end

    def to_json(json : JSON::Builder)
      json.raw(self.to_h.to_json)
    end

    def to_h
      {
        "id" => id,
        "username" => username,
        "bio" => bio,
        "discord_username" => preferences.show_discord_username ? discord_username : nil,
        "discord_discriminator" => preferences.show_discord_discriminator ? discord_discriminator : nil,
        "discord_tag" => discord_tag.empty? ? discord_tag : nil,
        "twitch" => preferences.show_twitch ? twitch : nil,
        "twitter" => preferences.show_twitter ? twitter : nil,
        "timezone" => timezone,
        "admin" => admin,
        "avatar_object_id" => avatar_object_id
      }
    end
  end
end
