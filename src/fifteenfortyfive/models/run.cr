class Run < Crecto::Model
  schema "runs" do
    field :name, String
    field :pb, String
    field :estimate, String

    belongs_to :runner, Account, foreign_key: :runner_id
    belongs_to :game, Game
    belongs_to :team, Team
  end
end
