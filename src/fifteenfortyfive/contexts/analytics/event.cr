require "json"

require "crecto"

module Analytics
  abstract struct EventData
  end

  struct EventMeta
  end

  class Event < Crecto::Model
    schema "analytics_events" do
      field :type, String
      field :raw_data, String
      field :raw_meta, String
      field :timestamp, Time

      set_created_at_field nil
      set_updated_at_field nil
    end

    EVENT_TYPES = {
      "unknown" => EventData
    }

    macro register_type(type, structure)
      {% EVENT_TYPES[type] = structure %}
    end

    def initialize(*, @type : String, data, meta=nil, @timestamp=Time.utc_now())
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
  end
end
