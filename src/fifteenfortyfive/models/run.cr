class Run < Crecto::Model
  schema "runs" do
    field :pb, String
    field :estimate, String
    field :priority, Int32

    belongs_to :runner, Account, foreign_key: :account_id
    belongs_to :submission, RunnerSubmission, foreign_key: :submission_id
    belongs_to :game, Game
    belongs_to :team, Team
  end
end
