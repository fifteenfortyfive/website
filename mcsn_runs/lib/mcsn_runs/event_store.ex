defmodule MCSN.Runs.EventStore do
  use EventStore, otp_app: :mcsn_runs

  # Optional `init/1` function to modify config at runtime.
  def init(config) do
    {:ok, config}
  end
end
