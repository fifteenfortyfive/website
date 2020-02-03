defmodule MCSN.Runs.Events.RunStarted do
  @derive Jason.Encoder
  defstruct [:run_id, :started_at]
end
