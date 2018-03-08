class GameSubmission < Crecto::Model
  schema "game_submissions" do
    field :pb, String
    field :estimate, String
    field :priority, Int32

    belongs_to :runner_submission, RunnerSubmission
    belongs_to :game, Game
    belongs_to :account, Account
  end
end
