defmodule MCSN.Runs.Projections do
  alias MCSN.Runs.Projections.{Run}
  alias MCSN.Runs.Repo

  @spec create_run(params :: %{}) :: Run.t()
  def create_run(params) do
    %Run{}
    |> Run.changeset(params)
    |> Repo.insert()
  end

  @spec list_runs() :: list(Run.t())
  def list_runs() do
    Repo.all(Run)
  end
end
