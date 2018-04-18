class Run < Crecto::Model
  schema "runs" do
    field :pb, String
    field :estimate, String
    field :priority, Int32

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
end
