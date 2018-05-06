class Supervisor
  struct Message
    enum State
      STARTED
      FINISHED
      EXCEPTION
    end

    {% for state in State.constants %}
      def self.{{state.id.downcase}}(owner : String) : self
        self.new(owner, State::{{state}})
      end
    {% end %}


    property owner : String
    property message : State

    def initialize(@owner : String, @message : String); end
  end


  struct Process
    property name : String
    property supervisor : Channel(Message)
    property proc : ->
    property fiber : Fiber?

    def initialize(@name : String, @supervisor : Channel(Message), &@proc : ->)
    end

    # A process is considered "alive" so long as the channel connected to it
    # remains open.
    def alive? : Bool
      @channel.open?
    end

    # Forcefully kill the current fiber
    def restart
      kill && run
    end

    def run
      @fiber = spawn do
        @supervisor.send(Message.started(@name))
        @proc.call
        @supervisor.send(Message.finished(@name))
      rescue
        @supervisor.send(Message.exception(@name))
      end
    end
  end



  property children : Hash(String, Process)
  property bus : Channel(Message)


  def initialize
    @children = {} of String => Process
    @bus = Channel(Message).new
  end


  def start_supervised(name : String, &block)
    @children[name] = Process.new(name, bus, &block)
  end

  def run
    loop do
      message = @bus.receive
      puts message.inspect
    end
  end
end
