@[Crinja::Attributes]
class RunnerSubmission < Crecto::Model
  include Crinja::Object::Auto

  schema "runner_submissions" do
    field :max_games, String
    field :max_time, String
    field :pair, String
    field :avoid, String
    field :games_json, String
    field :revoked, Bool, default: false
    field :captain, Bool, default: false

    belongs_to :account, Account
    has_many :runs, Run, foreign_key: :runner_submission_id
  end

  def games
    JSON.parse(@games_json || "[]").as_a.map do |game|
      game.as_h
    end
  end
end
