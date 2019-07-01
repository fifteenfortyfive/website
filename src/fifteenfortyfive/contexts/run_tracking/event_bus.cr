class RunTracking::EventBus
  alias Handler = Channel(RunEvent)

  property handlers : Array(Handler)

  def initialize
    @handlers  = [] of Handler
  end

  def publish(event : RunEvent)
    handlers.each do |handler|
      # Skip any closed handlers. Can happen if the receiving Fiber dies.
      next if handler.closed?
      handler.send(event)
    end
  end

  def subscribe(handler : Handler)
    handlers.push(handler)
  end

  def unsubscribe(handler : Handler)
    handlers.delete(handler)
  end
end
