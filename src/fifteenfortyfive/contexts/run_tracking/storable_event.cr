require "crecto"

require "./event.cr"

module RunTracking
  class StorableEvent < Crecto::Model
    DB_TABLE_NAME = "runtracking_events"

    schema "runtracking_events" do
      field :run_id, String
      field :type, String
      field :data, Json
      field :meta, Json

      field :timestamp, Time
      set_created_at_field nil
      set_updated_at_field nil
    end

    validate_required :type
    validate_required :run_id
    validate_required :data
    validate_required :meta

    def self.from_event(event : RunEvent)
      storage = self.new
      storage.run_id    = event.run_id
      storage.type      = event.type
      storage.data      = event.raw_data
      storage.meta      = event.raw_meta
      storage.timestamp = event.timestamp
      storage
    end

    def to_event
      RunEvent.new(
        run_id: self.run_id!,
        type: self.type!,
        data: self.data!,
        meta: self.meta,
        timestamp: self.timestamp!
      )
    end
  end
end
