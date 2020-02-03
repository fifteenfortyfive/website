defmodule MCSN.Runs.Commands.ResetRun do
  @enforce_keys [:run_id, :reset_at]
  defstruct [:run_id, :reset_at]
end
