# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :mcsn_runs,
  namespace: MCSNRuns,
  ecto_repos: [MCSNRuns.Repo]

# Configures the endpoint
config :mcsn_runs, MCSNRunsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "E+0E+QSJIPUDS3noKE1OuD/vWWEez5p8YY9mx8IAPyQFehdxzGs7DotYcO2O+rBT",
  render_errors: [view: MCSNRunsWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: MCSNRuns.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
