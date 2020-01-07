require "../accounts"
require "../events"

module Submissions
  class Submission < Crecto::Model
    schema "sub_submissions" do
      belongs_to :account, Accounts::Account
      belongs_to :event, Events::Event
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category

      field :pb_seconds, Int64
      field :est_seconds, Int64
      field :rank, Int32, default: 1

      field :comment, String

      field :revoked, Bool, default: false
      field :accepted, Bool, default: false

      belongs_to :meta, SubmissionMeta
    end

    validate_required [
      :account_id,
      :event_id,
      :game_id,
      :category_id,
      :pb_seconds,
      :est_seconds,
    ]
  end
end
