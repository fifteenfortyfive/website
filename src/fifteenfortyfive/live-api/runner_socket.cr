require "http"

module Sockets
  class Runner
    alias KeyType = Int32 | Int64
    property socket : HTTP::WebSocket
    property user : Account
    property valid_run_ids : Array(Int32 | Int64 | Nil)

    def initialize(@socket : HTTP::WebSocket, @user : Account)
      @valid_run_ids = Repo.all(Run, Query.where(account_id: @user.id)).map(&.id)
      @socket.on_message do |msg|
        handle_message(JSON.parse(msg))
      end
    end

    def handle_message(msg : JSON::Any)
      run = load_run(msg)

      case msg["action"]
      when "start_run"
        return unless run
        run.actual_start_time = Time.utc_now
        Repo.update(run)
        notify(run)

      when "resume_run"
        return unless run
        run.actual_end_time = nil
        run.actual_time_seconds = nil
        Repo.update(run)
        notify(run)

      when "finish_run"
        return unless run
        run.actual_end_time = Time.utc_now
        if (start = run.actual_start_time) && (finish = run.actual_end_time)
          run.actual_time_seconds = (finish - start).to_i
        end
        team = Repo.get!(Team, run.team_id)
        team.current_run_index = (run.schedule_index || 0) + 1
        Repo.update(team)

        Repo.update(run)
        notify(run)

      when "reset_run"
        return unless run
        run.actual_start_time = nil
        run.actual_end_time = nil
        run.actual_time_seconds = nil
        Repo.update(run)
        notify(run)

      when "get_state"
        return unless run
        notify({
          type: "get_state",
          run: run
        })

      when "healthcheck"
        notify({
          type: "healthcheck",
          statuses: {
            twitch: StreamStatusService.live?(@user.id.not_nil!),
            on_stream: false
          }
        })
      end
    end

    private def notify(message); @socket.send(message.to_json); end
    private def notify(message : String)
      @socket.send(message)
    end


    private def load_run(msg)
      return nil unless id = msg["run_id"]?
      Repo.all(Run, Query.where(id: msg["run_id"].to_s, account_id: @user.id)).first
    rescue
      nil
    end
  end
end
