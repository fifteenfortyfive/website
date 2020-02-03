defmodule MCSN.Runs.RunsRouter do
  use Commanded.Commands.Router

  alias MCSN.Runs.{Commands, Aggregates}

  identify(Aggregates.Run, by: :run_id)

  dispatch([Commands.CreateRun, Commands.StartRun, Commands.FinishRun, Commands.ResetRun],
    to: Aggregates.Run
  )
end
