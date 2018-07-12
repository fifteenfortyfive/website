require "http"

module Sockets
  class Stream
    alias KeyType = Int32 | Int64
    property socket : HTTP::WebSocket

    def initialize(@socket : HTTP::WebSocket)
      @socket.on_message do |msg|
        handle_message(JSON.parse(msg))
      end
    end

    def update
      current_streams = Repo.all(Team)
    end

    def handle_message(msg : JSON::Any)
      notify("pong")
    end

    private def notify(message); @socket.send(message.to_json); end
    private def notify(message : String)
      @socket.send(message)
    end
  end
end
