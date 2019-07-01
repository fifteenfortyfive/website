require "../accounts"

require "./*"
require "./events/*"
require "./commands/*"


module RunTracking
  struct RunAggregate # < Aggregate
    private alias User = Account
    include JSON::Serializable

    property version : Int64
    property last_updated : Time
    property run_id : String
    property est_seconds : Int64?
    property progress : Float64
    property in_progress : Bool
    property completed : Bool
    property started_at : Time?
    property finished_at : Time?

    def initialize(@run_id : String, @version = 1_i64)
      @last_updated = Time.new
      @in_progress = false
      @completed = false
      @est_seconds = nil
      @progress = 0_f64
    end

    def self.from_events(run_id : String, events)
      agg = self.new(run_id)
      events.reduce(agg){ |agg, event| agg.apply(event) }
    end



    ###
    # Processes
    ###

    def process(command : Commands::BaseCommand)
      events = do_process(command)
      events || [] of RunEvent
    end

    def do_process(command : Commands::CreateRun)
      est_seconds = command.est_seconds
      meta = command.meta
      [
        RunEvent.run_created(self.run_id, est_seconds, meta)
      ]
    end

    def do_process(command : Commands::BaseCommand)
      raise "Unknown command #{command}"
    end


    ###
    # Applications
    ###

    def apply(event : RunEvent)
      do_apply(event.data, event.meta)
      self.version += 1
      self.last_updated = event.timestamp
      self
    end

    def do_apply(data : RunCreatedEvent, meta)
      self.est_seconds = data.est_seconds
    end
  end
end
