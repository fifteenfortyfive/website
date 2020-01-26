use Mix.Config

# Configure your database
config :mcsn_runs, MCSN.Runs.Repo,
  username: "mcsn",
  password: "",
  database: "mcsn_runs_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mcsn_runs, MCSN.RunsWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
