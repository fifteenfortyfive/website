class Run < Crecto::Model
  schema "runs" do
    field :pb, String
    field :estimate, String
    field :priority, Int32
    field :schedule_index, Int32

    # Parsed versions of the user's pb and estimate inputs, used for all time-
    # based calculations.
    field :pb_seconds, Int32
    field :estimate_seconds, Int32

    # The actual time
    field :actual_start_time, Time
    field :actual_end_time, Time
    field :actual_time_seconds, Int32

    belongs_to :runner, Account, foreign_key: :account_id
    belongs_to :submission, RunnerSubmission, foreign_key: :runner_submission_id
    belongs_to :game, Game
    belongs_to :team, Team
  end


  def update_pb(new_time : String)
    self.pb = new_time
    self.pb_seconds =
      KNOWN_TIME_FORMATS.each do |format|
        break to_seconds(Time.parse!(new_time, format))
      rescue
        nil
      end
  end

  def update_estimate(new_time : String)
    self.estimate = new_time
    self.estimate_seconds =
      KNOWN_TIME_FORMATS.each do |format|
        break to_seconds(Time.parse!(new_time, format))
      rescue
        nil
      end
  end


  private KNOWN_TIME_FORMATS = [
    "%H:%M:%S",
    "%H:%M",
    "%H.%M"
  ]

  private def to_seconds(time : Time)
    time.hour * 3600 +
    time.minute * 60 +
    time.second
  end
end
