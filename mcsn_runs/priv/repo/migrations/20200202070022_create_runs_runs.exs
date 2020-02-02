defmodule MCSN.Runs.Repo.Migrations.CreateRuns do
  use Ecto.Migration

  def change do
    create table(:runs_runs, primary_key: false) do
      add :id, :string, primary_key: true
      add :started_at, :utc_datetime
      add :finished_at, :utc_datetime
      add :finished, :boolean, default: false, null: false
      add :elapsed_seconds, :integer

      timestamps()
    end
  end
end
