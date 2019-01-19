require "crinja"

module Template
  ENGINE.filters["strftime"] = Crinja.filter({format: nil}) do |arguments|
    time    = arguments.target!.as_time
    format  = arguments["format"].as_s!
    time.to_s(format)
  end

  ENGINE.filters["duration"] = Crinja.filter do |arguments|
    total_seconds = arguments.target!.as_number

    hours = (total_seconds / 3600).to_i
    minutes = (total_seconds / 60) % 60
    seconds = total_seconds % 60

    "%02d:%02d:%02d" % [hours, minutes, seconds]
  end
end
