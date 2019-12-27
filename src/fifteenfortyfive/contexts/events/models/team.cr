module Events
  class Team < Crecto::Model
    schema "ev_teams" do
      field :name, String
      field :color, String
      field :slug, String

      has_many :runs, Runs::Run

      field :actual_start_time, Time
      field :actual_end_time, Time
      field :actual_time_seconds, Int32

      field :icon_hash, String

      belongs_to :captain, Accounts::Account, foreign_key: :captain_id
      has_many :runners, Accounts::Account, through: :runs, foreign_key: :account_id

      belongs_to :event, Event
    end
  end
end
