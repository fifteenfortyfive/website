defmodule MCSN.Runs.Projections.Run do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, []}
  schema "runs" do
    field(:elapsed_seconds, :integer)
    field(:finished, :boolean, default: false)
    field(:finished_at, :utc_datetime)
    field(:started_at, :utc_datetime)
  end

  @doc false
  def changeset(run, attrs) do
    run
    |> cast(attrs, [:id, :started_at, :finished_at, :finished, :elapsed_seconds])
    |> validate_required([:id, :finished])
    |> unique_constraint(:id, name: :runs_pkey)
  end

  def update_changeset(run, attrs) do
    run
    |> cast(attrs, [:started_at, :finished_at, :finished, :elapsed_seconds])
    |> validate_required([:finished])
  end
end
