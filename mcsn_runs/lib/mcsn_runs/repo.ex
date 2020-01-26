defmodule MCSN.Runs.Repo do
  use Ecto.Repo,
    otp_app: :mcsn_runs,
    adapter: Ecto.Adapters.Postgres
end
