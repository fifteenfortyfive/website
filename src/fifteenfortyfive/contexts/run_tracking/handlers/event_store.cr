require "../../../repo.cr"
require "crecto"

require "../event_handler.cr"


class RunTracking::EventStore < RunTracking::EventHandler
  ###
  # Handlers
  ###

  def handle(event : RunEvent)
    storable = StorableEvent.from_event(event)
    # TODO: Broken seemingly because we're running in a separate Fiber. Very
    # unsure of how to fix.
    #
    # UPDATE: Seems to be working with multiple command types. Not sure why,
    # probably not stable.
    Repo.insert(storable)
  end
end
