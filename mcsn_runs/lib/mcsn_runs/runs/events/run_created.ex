defmodule MCSN.Runs.Events.RunCreated do
  @derive Jason.Encoder
  defstruct [:run_id]
end
