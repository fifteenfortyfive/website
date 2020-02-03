defmodule MCSN.Runs.Projections do
  alias MCSN.Runs.Projections.{Run}
  alias MCSN.Runs.Repo

  @spec list_runs() :: list(Run.t())
  def list_runs() do
    Repo.all(Run)
  end
end
