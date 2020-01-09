require "../accounts"
require "../events"

module Submissions
  class SubmissionMeta < Crecto::Model
    schema "sub_submission_metas" do
      belongs_to :account, Accounts::Account
      belongs_to :event, Events::Event

      field :max_games, Int32
      field :max_time, String

      field :pair_with, String
      field :avoid, String

      field :captain, Bool, default: false
      field :revoked, Bool, default: false

      has_many :submissions, Submission, foreign_key: :meta_id
    end

    validate_required [:account_id, :event_id]
  end
end
