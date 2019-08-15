module Events
  class RunnerSubmission < Crecto::Model
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

    validate_required [:account_id, :event_id]
  end
end
