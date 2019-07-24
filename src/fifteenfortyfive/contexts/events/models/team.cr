require "crinja"

module Events
  @[Crinja::Attributes]
  class Team < Crecto::Model
    include Crinja::Object::Auto

    schema "ev_teams" do
      field :name, String
      field :color, String
      field :slug, String

      has_many :runs, Events::Run

      field :actual_start_time, Time
      field :actual_end_time, Time
      field :actual_time_seconds, Int32

      belongs_to :captain, Accounts::Account, foreign_key: :captain_id
      has_many :runners, Accounts::Account, through: :runs, foreign_key: :account_id

      belongs_to :event, Event
    end
  end
end
