require "../repo"
require "./run_tracking/supervisor.cr"

module RunTracking
  alias RunID = String

  extend self

  @@supervisor : Supervisor?

  def supervisor
    if supervisor = @@supervisor
      supervisor
    else
      raise "Run Tracking supervisor not started!"
    end
  end

  def start
    @@supervisor = Supervisor.new
  end

  delegate(
    :list_runs,
    :get_run,
    :new_run,
    :events_for_run,
    :emit,
    :process_and_save,
    to: supervisor
  )

  ###
  # Runs
  ###

  def create_run(run_id : String, name : String, seed, user)
    if run = new_run(run_id)
      commands = [
        Commands::CreateRun.new(name: name),
      ].reduce(run) do |agg, command|
        process_and_save(agg, command.with_meta(user.id))
      end

      run
    end
  end
end
