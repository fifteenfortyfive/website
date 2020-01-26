defmodule MCSNRunsWeb.Router do
  use MCSNRunsWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", MCSNRunsWeb do
    pipe_through :api
  end
end
