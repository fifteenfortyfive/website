module Events
  class Event < Crecto::Model
    STATES = [
      "created",
      "signups open",
      "signups closed",
      "runners announced",
      "scheduled",
      "in progress",
      "completed",
      "cancelled",
    ]

    schema "ev_events" do
      field :name, String
      field :summary, String
      field :details, String
      field :rules, String
      field :icon_hash, String

      field :signups_open_time, Time
      field :signups_closed_time, Time
      field :runners_announced_time, Time
      field :start_time, Time
      field :start_time_is_estimate, Bool, default: false
      field :end_time, Time
      field :end_time_is_estimate, Bool, default: false

      field :actual_start_time, Time
      field :actual_end_time, Time
      field :actual_time_seconds, Int32

      field :avatar_hash, String
      field :link, String

      field :state, String, default: "created"

      # Psuedo-temporary solution for events with only one game/category being run,
      # i.e., individual race events.
      belongs_to :series, Series
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category
      # Allowed Runs will replace these associations in the future
      has_many :allowed_runs, AllowedRun

      belongs_to :owner, Accounts::Account, foreign_key: :owner_id

      has_many :runner_submissions, RunnerSubmission
      has_many :run_submissions, RunSubmission
    end
  end
end
