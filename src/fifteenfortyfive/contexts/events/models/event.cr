require "crinja"

module Events
  @[Crinja::Attributes]
  class Event < Crecto::Model
    include Crinja::Object::Auto

    STATES = [
      "created",
      "signups open",
      "signups closed",
      "runners announced",
      "scheduled",
      "in progress",
      "completed",
      "cancelled"
    ]

    schema "events" do
      field :name, String
      field :summary, String
      field :details, String
      field :rules, String

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

      field :avatar_object_id, String
      field :link, String

      field :state, String, default: "created"

      # Psuedo-temporary solution for events with only one game/category being run,
      # i.e., individual race events.
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category

      belongs_to :owner, Account, foreign_key: :owner_id

      has_many :runner_submissions, RunnerSubmission
      has_many :run_submissions, RunSubmission
    end

    @[Crinja::Attribute]
    def available_states
      STATES
    end
  end
end
