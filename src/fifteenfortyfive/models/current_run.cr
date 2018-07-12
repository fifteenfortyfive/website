class CurrentRun < Crecto::Model
  schema "current_runs" do
    belongs_to :run, Run
    belongs_to :team, Team
    belongs_to :account, Account

    field :schedule_index, Int32

    field :pb_seconds, Int32
    field :estimate_seconds, Int32
    field :team_name, String
    field :username, String
    field :twitch, String
    field :twitter, String
    field :avatar_object_id, String
    field :game_name, String
    field :game_series, String
    field :progress_unit, String
    field :progress_max, String
  end
end
