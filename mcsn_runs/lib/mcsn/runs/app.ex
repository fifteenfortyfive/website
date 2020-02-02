defmodule MCSN.Runs.App do
  use Commanded.Application,
    otp_app: :mcsn_runs,
    event_store: [
      adapter: Commanded.EventStore.Adapters.EventStore,
      event_store: MCSN.Runs.EventStore
    ]

  router(MCSN.Runs.RunsRouter)
end
