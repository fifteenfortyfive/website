# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :mcsn_runs,
  namespace: MCSN,
  ecto_repos: [MCSN.Runs.Repo]

# Configures the endpoint
config :mcsn_runs, MCSN.RunsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "UfZnLvifBEjDc3sYU+X8a4Eu/2VLzK9OBY3CW6CbCF8FdgH3FhKdpe1QodMU20fv",
  render_errors: [view: MCSN.RunsWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: MCSN.Runs.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Event Storage via Commanded
config :mcsn_runs, event_stores: [MCSN.Runs.EventStore]

config :mcsn_runs, MCSN.Runs.EventStore,
  column_data_type: "jsonb",
  serializer: EventStore.JsonbSerializer,
  types: EventStore.PostgresTypes

config :commanded,
  event_store_adapter: Commanded.EventStore.Adapters.EventStore

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
