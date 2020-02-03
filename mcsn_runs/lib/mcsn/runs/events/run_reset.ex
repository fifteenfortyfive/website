defmodule MCSN.Runs.Events.RunReset do
  @derive Jason.Encoder
  defstruct [:run_id, :reset_at]
end
