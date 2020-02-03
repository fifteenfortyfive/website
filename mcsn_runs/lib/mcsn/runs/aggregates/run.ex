defmodule MCSN.Runs.Aggregates.Run do
  alias __MODULE__
  alias MCSN.Runs.{Commands, Events}

  @type t :: %__MODULE__{
          run_id: String.t(),
          started_at: DateTime.t() | nil,
          finished_at: DateTime.t() | nil,
          last_reset_at: DateTime.t() | nil
        }
  @enforce_keys [:run_id]
  defstruct [
    :run_id,
    :started_at,
    :finished_at,
    :last_reset_at
  ]

  ###
  # Commands
  ###

  # Catch any case where run_id isn't set on a command. This should be enforced
  # by the command structs themselves, but is added here for more safety.
  def execute(%Run{}, %{run_id: nil}) do
    {:error, :no_id_specified}
  end

  # CreateRun
  def execute(%Run{run_id: nil}, %Commands.CreateRun{run_id: run_id}) do
    %Events.RunCreated{run_id: run_id}
  end

  def execute(%Run{run_id: run_id}, %Commands.CreateRun{run_id: run_id}) do
    {:error, :already_exists}
  end

  # StartRun
  def execute(%Run{run_id: run_id, started_at: nil}, %Commands.StartRun{start_at: start_at}) do
    %Events.RunStarted{run_id: run_id, started_at: start_at}
  end

  def execute(%Run{}, %Commands.StartRun{}), do: {:error, :already_started}

  # FinishRun
  def execute(%Run{started_at: nil}, %Commands.FinishRun{}) do
    {:error, :not_started}
  end

  def execute(%Run{run_id: run_id, finished_at: nil}, %Commands.FinishRun{finish_at: finish_at}) do
    %Events.RunFinished{run_id: run_id, finished_at: finish_at}
  end

  def execute(%Run{}, %Commands.FinishRun{}), do: {:error, :already_finished}

  # ResetRun
  def execute(%Run{started_at: nil}, %Commands.ResetRun{}) do
    {:error, :not_started}
  end

  def execute(%Run{run_id: run_id}, %Commands.ResetRun{reset_at: reset_at}) do
    %Events.RunReset{run_id: run_id, reset_at: reset_at}
  end

  ###
  # Events
  ###

  def apply(%Run{} = run, %Events.RunCreated{run_id: run_id} = _event) do
    %Run{run | run_id: run_id}
  end

  def apply(%Run{} = run, %Events.RunStarted{started_at: started_at} = _event) do
    %Run{run | started_at: started_at}
  end

  def apply(%Run{} = run, %Events.RunFinished{finished_at: finished_at} = _event) do
    %Run{run | finished_at: finished_at}
  end

  def apply(%Run{} = run, %Events.RunReset{reset_at: reset_at} = _event) do
    %Run{run | started_at: nil, finished_at: nil, last_reset_at: reset_at}
  end
end
