require "crecto"

require "../event_handler.cr"


class RunTracking::Notifier < RunTracking::EventHandler
  def handle(event : RunEvent)
    run_id = event.run_id
    run = RunTracking.get_run(event.run_id)

    # BingoWeb::SocketSupervisor.broadcast(run_id.to_s, {
    #   type: "run_update",
    #   run: run,
    #   events: [event]
    # })
  end
end
