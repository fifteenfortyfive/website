require "crinja"
require "crypto/bcrypt/password"

module Events
  @[Crinja::Attributes]
  class Team < Crecto::Model
    include Crinja::Object::Auto

    schema "ev_teams" do
      field :name, String
      field :color, String
      field :slug, String

      has_many :runs, Events::Run

      belongs_to :captain, Account, foreign_key: :captain_id
      has_many :runners, Account, through: :runs, foreign_key: :account_id

      belongs_to :event, Event
    end
  end
end
