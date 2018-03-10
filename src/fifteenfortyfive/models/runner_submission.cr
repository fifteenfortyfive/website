class RunnerSubmission < Crecto::Model
  schema "runner_submissions" do
    field :max_games, String
    field :max_time, String
    field :pair, String
    field :avoid, String
    field :games_json, String
    field :revoked, Bool, default: false
    field :captain, Bool, default: false

    belongs_to :account, Account
    has_many :runs, Run, foreign_key: :submission_id
  end

  def games
    JSON.parse(@games_json || "[]").as_a.map do |game|
      game.as(Hash(String, JSON::Type))
    end
  end
end
