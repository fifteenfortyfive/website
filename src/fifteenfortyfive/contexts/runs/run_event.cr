module Runs
  # RunEvents track the event log for Runs. This allows Run to be mutable
  # without losing data about when different events happen, and also allowing
  # repeat events without overwriting data
  class RunEvent < Crecto::Model
    schema "ev_run_events" do
      belongs_to :run, Run

      field :type, String
      field :occurred_at, Time

      set_created_at_field nil
      set_updated_at_field nil
    end
  end
end
