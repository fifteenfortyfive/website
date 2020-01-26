# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

config :mcsn_runs, MCSN.Runs.Repo,
  # ssl: true,
  url: database_url,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")

event_store_url =
  System.get_env("EVENT_STORE_URL") ||
    raise """
    environment variable EVENT_STORE_URL is missing.
    For example: postgres://USER:PASS@HOST/DATABASE
    """

config :mcsn_runs, MCSN.Runs.EventStore,
  serializer: EventStore.JsonSerializer,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  url: event_store_url

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :mcsn_runs, MCSN.RunsWeb.Endpoint,
  http: [:inet6, port: String.to_integer(System.get_env("PORT") || "3214")],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :mcsn_runs, MCSN.RunsWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
