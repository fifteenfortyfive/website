defmodule MCSN.Runs.Handlers.RunsEventHandler do
  use Commanded.Event.Handler,
    application: MCSN.Runs.Application,
    name: "RunsEventHandler"

  alias MCSN.Runs.Events
  alias MCSN.Runs.Projections.Run

  def handle(%Events.RunCreated{run_id: _run_id}, _metadata) do
    :ok
  end
end
