require "crinja"

module Template
  ENGINE.filters["strftime"] = Crinja.filter({format: nil}) do |arguments|
    time    = arguments.target!.as_time
    format  = arguments["format"].as_s!
    time.to_s(format)
  end
end
