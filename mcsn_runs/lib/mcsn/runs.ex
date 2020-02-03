defmodule MCSN.Runs do
  alias MCSN.Runs.{App, Commands, Aggregates}

  @spec create_run() :: {:ok, Aggregates.Run.t()} | {:error, term}
  def create_run do
    run_id = UUID.uuid4()

    %Commands.CreateRun{run_id: run_id}
    |> App.dispatch(returning: :aggregate_state)
  end

  @spec start_run(run_id :: String.t()) :: {:ok, DateTime.t()} | {:error, term}
  def start_run(run_id) do
    start_at = DateTime.utc_now()

    result =
      %Commands.StartRun{run_id: run_id, start_at: start_at}
      |> App.dispatch()

    case result do
      :ok -> {:ok, start_at}
      _ -> result
    end
  end

  @spec finish_run(run_id :: String.t()) :: {:ok, DateTime.t()} | {:error, term}
  def finish_run(run_id) do
    finish_at = DateTime.utc_now()

    result =
      %Commands.FinishRun{run_id: run_id, finish_at: finish_at}
      |> App.dispatch()

    case result do
      :ok -> {:ok, finish_at}
      _ -> result
    end
  end

  @spec reset_run(run_id :: String.t()) :: {:ok, DateTime.t()} | {:error, term}
  def reset_run(run_id) do
    reset_at = DateTime.utc_now()

    result =
      %Commands.ResetRun{run_id: run_id, reset_at: reset_at}
      |> App.dispatch()

    case result do
      :ok -> {:ok, reset_at}
      _ -> result
    end
  end
end
