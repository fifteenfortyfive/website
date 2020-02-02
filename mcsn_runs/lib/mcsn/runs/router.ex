defmodule MCSN.Runs.RunsRouter do
  use Commanded.Commands.Router

  alias MCSN.Runs.{Commands}
  alias MCSN.Runs.Aggregates.Run

  identify(Run, by: :run_id)

  dispatch(Commands.CreateRun, to: Run)
end
