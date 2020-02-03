defmodule MCSN.Runs.Events.RunFinished do
  @derive Jason.Encoder
  defstruct [:run_id, :finished_at]
end
