defmodule MCSN.Runs.Handlers.RunsProjector do
  use Commanded.Projections.Ecto,
    application: MCSN.Runs.App,
    repo: MCSN.Runs.Repo,
    name: "runs_projector"

  alias MCSN.Runs.Events
  alias MCSN.Runs.Repo
  alias MCSN.Runs.Projections.{Run}

  ###
  # Projection handlers
  ###

  project(%Events.RunCreated{run_id: run_id}, _metadata, fn multi ->
    changeset =
      %Run{}
      |> Run.changeset(%{id: run_id})

    multi
    |> Ecto.Multi.insert(:insert, changeset)
  end)

  project(%Events.RunStarted{run_id: run_id, started_at: started_at}, fn multi ->
    run = Repo.get(Run, run_id)

    multi
    |> maybe_update_run(:started, run, %{started_at: started_at})
  end)

  project(%Events.RunFinished{run_id: run_id, finished_at: raw_finished_at}, fn multi ->
    run = Repo.get(Run, run_id)
    {:ok, finished_at, _offset} = DateTime.from_iso8601(raw_finished_at)
    elapsed_seconds = DateTime.diff(finished_at, run.started_at)

    multi
    |> maybe_update_run(:started, run, %{
      finished_at: finished_at,
      elapsed_seconds: elapsed_seconds
    })
  end)

  project(%Events.RunReset{run_id: run_id}, fn multi ->
    run = Repo.get(Run, run_id)

    multi
    |> maybe_update_run(:started, run, %{started_at: nil, finished_at: nil})
  end)

  ###
  # Utilities
  ###

  @spec maybe_update_run(
          multi :: Ecto.Multi.t(),
          name :: atom,
          run :: Run.t(),
          changes :: map
        ) :: Ecto.Multi.t()
  defp maybe_update_run(multi, name, run = %Run{}, changes = %{}) do
    multi
    |> Ecto.Multi.update(name, Run.update_changeset(run, changes))
  end

  defp maybe_update_run(multi, _name, _run, _changes), do: multi
end
