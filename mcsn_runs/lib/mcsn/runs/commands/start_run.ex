defmodule MCSN.Runs.Commands.StartRun do
  @enforce_keys [:run_id, :start_at]
  defstruct [:run_id, :start_at]
end
