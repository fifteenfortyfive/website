module Schedules
  class Activity < Crecto::Model
    schema "sched_activities" do
      belongs_to :schedule, Schedule

      field :index, Int32, default: nil

      field :setup_seconds, Int32, default: 0
      field :est_seconds, Int32
      field :teardown_seconds, Int32, default: 0

      field :actual_seconds, Int32
      field :actual_start_time, Time
      field :actual_end_time, Time

      belongs_to :run, Runs::Run

      set_created_at_field nil
      set_updated_at_field nil
    end

    def is_same(other : self)
      self.id == other.id ||
        self.run_id == other.run_id
    end
  end
end
