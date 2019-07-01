require "dotenv"
Dotenv.load!

require "pg"
require "crecto"

require "./fifteenfortyfive/contexts/run_tracking"
RunTracking.start

###
# Stubs
###
class RunTracking::Supervisor
  def events_for_run(run_id)
    [] of RunTracking::RunEvent
  end
end


run_id = "1"

[
  RunTracking::Commands::CreateRun.new(run_id: run_id, est_seconds: 25153_i64)
].map do |command|
  agg = RunTracking.get_run(run_id)
  events = agg.process(command.with_meta(user_id: 1))
  RunTracking.emit(events)
end


agg = RunTracking.supervisor.cache.runs["1"]
pp! agg

loop do
  sleep
end
