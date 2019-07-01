require "../event_handler.cr"

class RunTracking::Cache < RunTracking::EventHandler
  property runs = {} of String => RunAggregate

  ###
  # Accessors
  ###

  delegate :[], :[]?, to: runs

  def manual_update(run_id : String, run : RunAggregate)
    runs[run_id] = run
  end



  ###
  # Handlers
  ###

  def handle(event : RunEvent)
    # New state
    run_id = event.run_id
    run = runs[run_id]? || RunAggregate.new(run_id)
    run = run.apply(event)
    # Update cache
    runs[run_id] = run
  end
end
