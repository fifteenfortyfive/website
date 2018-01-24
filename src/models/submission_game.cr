class SubmissionGame < Crecto::Model
  schema "submissions_games" do
    field :pb, String
    field :estimate, String

    belongs_to :game, Game
    belongs_to :submission, Submission
  end
end
