module Schedules
  class Schedule < Crecto::Model
    schema "sched_schedules" do
      has_many :activities, Activity

      field :name, String
      field :description, String

      field :est_start_time, Time
      field :est_end_time, Time

      field :actual_start_time, Time
      field :actual_end_time, Time
      field :actual_time_seconds, Int32
    end
  end
end
