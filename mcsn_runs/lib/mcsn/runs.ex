defmodule MCSN.Runs do
  alias MCSN.Runs.App
  alias MCSN.Runs.Commands.{CreateRun}
  alias MCSN.Runs.Aggregates.{Run}

  @spec create_run() :: {:ok, Run.t()}
  def create_run do
    run_id = UUID.uuid4()

    %CreateRun{run_id: run_id}
    |> App.dispatch(returning: :aggregate_state)
  end
end
