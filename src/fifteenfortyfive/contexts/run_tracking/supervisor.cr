require "../../repo.cr"
require "crecto"

require "./*"
require "./handlers/*"


class RunTracking::Supervisor
  # Central bus for propogating events
  property event_bus : EventBus
  # In-memory cache of aggregates
  property cache : Cache
  # property event_store : EventStore
  property notifier : Notifier
  property workers : Array(Fiber)

  def initialize
    @event_bus = EventBus.new
    @workers = [] of Fiber
    @cache = Cache.new(event_bus)
    # @event_store = EventStore.new(event_bus)
    @notifier = Notifier.new(event_bus)
    @workers = start_workers([cache, notifier])
  end

  def start_workers(workers) : Array(Fiber)
    workers.map do |worker|
      spawn{ worker.start }
    end
  end

  # Returns a list of all runs in the tracking system.
  def list_runs
    # Query the event store for all distinct run_ids, then load those runs
    # either from the cache or by replaying the events to get the current
    # aggregate state.
    results = Repo.query("SELECT DISTINCT run_id FROM #{StorableEvent::DB_TABLE_NAME}")
    run_ids = [] of RunID
    results.each do
      run_ids << results.read(RunID)
    end
    run_ids.map(&->get_run(RunID))
  end

  # Return the Run with the given ID.
  #
  # Checks the in-memory cache first, otherwise builds the state back from
  # the stored events for that ID.
  def get_run(run_id : RunID)
    if run = cache[run_id]?
      run
    else
      events = events_for_run(run_id)
      run = RunAggregate.from_events(run_id, events)
      update_cache(run_id, run)
      run
    end
  end

  def new_run(run_id : RunID)
    RunAggregate.new(run_id)
  end

  def events_for_run(run_id)
    stored_events = Repo.all(StorableEvent, Query.where(run_id: run_id).order_by("timestamp ASC"))
    stored_events.map(&.to_event)
  end

  def process_and_save(run : RunAggregatee, command : Commands::BaseCommand)
    events = run.process(command)
    multi = Multi.new
    events.each do |event|
      storable = StorableEvent.from_event(event)
      multi.insert(storable)
    end
    Repo.transaction(multi)

    emit(events)
    run
  end


  def emit(events : Array(RunEvent))
    events.each do |event|
      event_bus.publish(event)
    end
  end

  private def update_cache(run_id, run)
    cache.manual_update(run_id, run)
  end
end
