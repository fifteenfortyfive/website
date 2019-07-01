require "http"

module SocketService
  class_property service = Service.new

  def self.run
    @@service = Service.new

    loop do
      sleep(15)
      service.ping_all
    end
  end

  def self.add_stream(socket : HTTP::WebSocket)
    if serv = @@service
      socket.on_close{ serv.remove_stream(socket) }
      serv.add_stream(socket)
    end
  end

  def self.broadcast(message)
    if serv = @@service
      serv.broadcast(message)
    end
  end


  class Service
    property sockets : Array(HTTP::WebSocket)

    def initialize
      @sockets = [] of HTTP::WebSocket
    end

    def add_stream(socket : HTTP::WebSocket)
      @sockets.push(socket)
    end

    def remove_stream(socket : HTTP::WebSocket)
      @sockets.delete(socket)
    end


    def ping_all
      @sockets.each(&.send(%q({"type": "ping"})))
    end

    def broadcast(message)
      @sockets.each do |sock|
        notify(sock, message)
      end
    end


    private def notify(socket : HTTP::WebSocket, message : String)
      socket.send(message)
    end

    private def notify(socket : HTTP::WebSocket, message)
      socket.send(message.to_json)
    end
  end
end
