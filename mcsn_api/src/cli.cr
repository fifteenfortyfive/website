require "admiral"
require "./mcsn_api.cr"

module MCSN
  module CLI
    class RunAPI < Admiral::Command
      define_flag hostname : String,
        description: "The hostname the API should bind to",
        required: true
      define_flag port : Int32,
        description: "The port the API should listen on",
        required: true

      def run
        hostname = flags.hostname
        port = flags.port
        puts "Starting API on #{hostname}:#{port}"

        MCSN.run(hostname, port)
      end
    end
  end
end

MCSN::CLI::RunAPI.run
