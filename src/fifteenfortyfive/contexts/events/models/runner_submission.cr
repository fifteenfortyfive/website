require "crinja"

module Events
  @[Crinja::Attributes]
  class RunnerSubmission < Crecto::Model
    include Crinja::Object::Auto

    schema "ev_runner_submissions" do
      belongs_to :account, Accounts::Account
      belongs_to :event, Event

      field :max_games, Int32
      field :max_time, String

      field :pair_with, String
      field :avoid, String

      field :captain, Bool, default: false
      field :revoked, Bool, default: false

      has_many :run_submissions, RunSubmission
    end
  end
end
