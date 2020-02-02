defmodule MCSN.Runs.Runs do
  # alias Ecto.Changeset

  alias MCSN.Runs.App
  alias MCSN.Runs.Commands.{CreateRun}
  alias MCSN.Runs.Aggregates.{Run}

  def create_run do
    run_id = UUID.uuid4()

    result =
      %CreateRun{run_id: run_id}
      |> App.dispatch()

    case result do
      :ok -> {:ok, %Run{run_id: run_id}}
      reply -> reply
    end
  end
end
