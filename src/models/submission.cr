class Submission < Crecto::Model
  schema "submissions" do
    field :max_games, String
    field :max_time, String
    field :pair, String
    field :avoid, String

    belongs_to :account, Account
    has_many :games, SubmissionGame, dependent: :destroy
  end
end
