abstract class RunTracking::EventHandler
  property bus : EventBus
  property handler : EventBus::Handler

  def initialize(@bus : EventBus)
    @handler = EventBus::Handler.new

    bus.subscribe(handler)
  end

  def start
    loop do
      event = handler.receive?
      # `event` will be nil if the bus channel closed for any reason. In which
      # case, stop waiting for messages and allow the parent to continue.
      break unless event
      handle(event)
    end
  end

  # Unsubscribes the handler from the event bus to avoid potential locks if the
  # bus tries to send an event to this handler when it will be unable to
  # receive it. Unsubscribing also removes the reference to this class'
  # `Handler` and allows it to be garbage collected.
  def finalize
    bus.unsubscribe(handler)
  end

  # To be implemented by handlers. This method is called by the EventBus
  # whenever a new Event comes in.
  abstract def handle(event : RunEvent)
end
