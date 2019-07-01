require "../event"

module RunTracking
  struct RunCreatedEvent < EventData
    include JSON::Serializable

    property est_seconds : Int64
  end

  RunEvent.register_type("run_created", RunCreatedEvent)
end
