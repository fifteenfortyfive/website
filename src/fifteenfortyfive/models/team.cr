class Team < Crecto::Model
  schema "teams" do
    field :name, String
    field :color, String
    field :slug, String

    belongs_to :captain, Account, foreign_key: :captain_id
    has_many :runs, Run
  end
end
