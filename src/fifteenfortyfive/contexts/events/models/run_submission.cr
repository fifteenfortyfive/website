module Events
  class RunSubmission < Crecto::Model
    schema "ev_run_submissions" do
      belongs_to :account, Accounts::Account
      belongs_to :event, Event
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category

      field :pb_seconds, Int64
      field :est_seconds, Int64
      field :rank, Int32, default: 1

      field :comment, String

      field :revoked, Bool, default: false
      field :accepted, Bool, default: false

      belongs_to :runner_submission, RunnerSubmission
    end

    validate_required [
      :account_id,
      :event_id,
      :game_id,
      :category_id,
      :pb_seconds,
      :est_seconds
    ]
  end
end
