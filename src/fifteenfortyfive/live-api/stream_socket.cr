require "http"

module Sockets
  class Stream
    alias KeyType = Int32 | Int64
    property socket : HTTP::WebSocket

    property current_featured_run : FeaturedRun?

    def initialize(@socket : HTTP::WebSocket)
      @socket.on_message do |msg|
        handle_message(JSON.parse(msg))
      end
      notify({type: "initialize"})

      featured_runs = Repo.all(FeaturedRun)
      @current_featured_run = featured_runs.find{ |r| r.actual_start_time.nil? }
      @cycle_index = 0
    end

    def handle_message(msg : JSON::Any)
      case msg["request"]?
      when "ping"
        notify("pong")

      when "sidebar_runs"
        current_runs = Repo.all(CurrentRun)
        if featured = current_featured_run
          current_runs = current_runs.reject{ |r| r.team_id == featured.team_id }
        end
        runs = [
          current_runs[@cycle_index % current_runs.size],
          current_runs[(@cycle_index+1) % current_runs.size]
        ]
        @cycle_index += 2
        notify({type: "sidebar_runs", runs: runs })

      when "featured_run"
        run = current_featured_run(force_update: true)
        notify({type: "featured_run", run: run })

      when "run_data"
        run = Repo.get(Run, msg["run_id"].to_s)
        notify({type: "run_data", run: run})
      end
    end

    private def current_featured_run(force_update=false)
      if force_update
        featured_runs = Repo.all(FeaturedRun)
        @current_featured_run = featured_runs.find{ |r| r.actual_time_seconds.nil? }
      else
        @current_featured_run ||= begin
          featured_runs = Repo.all(FeaturedRun)
          featured_runs.find{ |r| r.actual_start_time.nil? }
        end
      end
    end

    private def notify(message); @socket.send(message.to_json); end
    private def notify(message : String)
      @socket.send(message)
    end
  end
end
