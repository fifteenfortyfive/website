defmodule MCSN.Runs.Commands.FinishRun do
  @enforce_keys [:run_id, :finish_at]
  defstruct [:run_id, :finish_at]
end
