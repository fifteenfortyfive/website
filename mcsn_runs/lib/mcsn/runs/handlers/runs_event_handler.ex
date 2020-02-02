defmodule MCSN.Runs.Handlers.RunsEventHandler do
  use Commanded.Event.Handler,
    application: MCSN.Runs.App,
    name: "RunsEventHandler"

  alias MCSN.Runs.Events
  alias MCSN.Runs.Projections

  def handle(%Events.RunCreated{run_id: run_id}, _metadata) do
    Projections.create_run(%{id: run_id})
    :ok
  end
end
