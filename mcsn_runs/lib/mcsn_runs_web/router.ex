defmodule MCSN.RunsWeb.Router do
  use MCSN.RunsWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", MCSN.RunsWeb do
    pipe_through :api
  end
end
