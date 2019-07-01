require "json"

module RunTracking
  abstract struct EventData
  end

  struct EventMeta
    JSON.mapping(
      user_id: Int64
    )
  end

  struct RunEvent
    JSON.mapping(
      type: String,
      run_id: String,
      raw_data: String,
      raw_meta: String,
      timestamp: Time
    )

    EVENT_TYPES = {
      "unknown" => EventData
    }

    macro register_type(type, structure)
      {% EVENT_TYPES[type] = structure %}
    end

    def initialize(*, @type : String, @run_id : String, data, meta, @timestamp=Time.utc_now())
      @raw_data =
        case data
        when String
          data
        else
          data.to_json
        end

      @raw_meta =
        case meta
        when String
          meta
        else
          meta.to_json
        end
    end

    @parsed_data : EventData?
    def data
      @parsed_data ||= EVENT_TYPES[@type].from_json(@raw_data)
    end

    @parsed_meta : EventMeta?
    def meta
      @parsed_meta ||= EventMeta.from_json(@raw_meta)
    end


    ###
    # Events
    ###

    def RunEvent.run_created(run_id : String, est_seconds : Int64, meta)
      new(
        type: "run_created",
        run_id: run_id,
        data: {
          est_seconds: est_seconds
        },
        meta: meta
      )
    end
  end
end
