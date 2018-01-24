class CommentatorSubmission < Crecto::Model
  schema "commentator_submissions" do
    field :games, String
    field :experience, String
    field :availability, String
    field :revoked, Bool, default: false

    belongs_to :account, Account
  end
end
