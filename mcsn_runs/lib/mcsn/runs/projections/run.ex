defmodule MCSN.Runs.Projections.Run do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, []}
  schema "runs_runs" do
    field(:elapsed_seconds, :integer)
    field(:finished, :boolean, default: false)
    field(:finished_at, :utc_datetime)
    field(:started_at, :utc_datetime)

    timestamps()
  end

  @doc false
  def changeset(run, attrs) do
    run
    |> cast(attrs, [:id, :started_at, :finished_at, :finished, :elapsed_seconds])
    |> validate_required([:id])
  end
end
