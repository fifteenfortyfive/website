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

    belongs_to :runner, Account, foreign_key: :account_id
    belongs_to :submission, RunnerSubmission, foreign_key: :runner_submission_id
    belongs_to :game, Game
    belongs_to :team, Team
  end

  @pb_time : Time::Span?
  def pb_time
    @pb_time ||= begin
      if seconds = self.pb_seconds
        Time::Span.new(seconds: seconds, nanoseconds: 0)
      end
    end
  end

  @estimate_time : Time::Span?
  def estimate_time
    @estimate_time ||= begin
      if seconds = self.estimate_seconds
        Time::Span.new(seconds: seconds, nanoseconds: 0)
      end
    end
  end


  def update_pb(new_time : String)
    self.pb = new_time
    self.pb_seconds =
      KNOWN_TIME_FORMATS.each do |format|
        break to_seconds(Time.parse(new_time, format))
      rescue
        nil
      end
  end

  def update_estimate(new_time : String)
    self.estimate = new_time
    self.estimate_seconds =
      KNOWN_TIME_FORMATS.each do |format|
        break to_seconds(Time.parse(new_time, format))
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
