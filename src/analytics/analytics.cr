require "auto_initialize"

require "./event_types.cr"

class Analytics
  alias Buffer = Array(Message)
  alias MessageBus = Channel(Message)

  # Maximum number of events to track before automatically flushing
  # the buffer. This is high enough that it should be cooperative in
  # almost all cases.
  BUFFER_LENGTH = 32

  struct Message
    include AutoInitialize

    property content : String
    property flush : Bool
  end

  class_getter! instance : self
  class_getter! channel : MessageBus

  def self.start_service(endpoint : String)
    @@channel = MessageBus.new
    @@instance = new(endpoint, channel)
  end

  def self.track(data, flush : Bool=false)
    channel.send(Message.new(
      content: data.to_json,
      flush: flush
    ))
  end

  property endpoint : String
  property buffer : Buffer
  property channel : MessageBus

  def initialize(@endpoint : String, @channel : MessageBus)
    @buffer = Buffer.new(BUFFER_LENGTH)
  end

  def run
    loop do
      message = channel.receive
      buffer.push(message)

      if message.flush || buffer.size == BUFFER_LENGTH
        flush()
      end
    end
  end

  def flush
    # buffer.each do |message|
    #   puts "ANALYTICS: " + message.content.inspect
    # end
  end
end
