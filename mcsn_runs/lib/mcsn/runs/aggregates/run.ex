defmodule MCSN.Runs.Aggregates.Run do
  alias __MODULE__
  alias MCSN.Runs.{Commands, Events}

  @type t :: %Run{
          run_id: String.t(),
          started_at: Time.t() | nil,
          finished_at: Time.t() | nil
        }

  @enforce_keys [:run_id]
  defstruct [
    :run_id,
    :started_at,
    :finished_at
  ]

  # Commands

  def execute(%Run{run_id: nil}, %Commands.CreateRun{run_id: run_id}) do
    %Events.RunCreated{run_id: run_id}
  end

  def execute(%Run{run_id: run_id}, %Commands.CreateRun{run_id: run_id}) do
    {:error, "run with id #{run_id} already exists"}
  end

  def execute(%Run{}, %Commands.CreateRun{run_id: nil}) do
    {:error, "no run id specified"}
  end

  # Events

  def apply(%Run{} = run, %Events.RunCreated{run_id: run_id} = _event) do
    %Run{run | run_id: run_id}
  end
end
