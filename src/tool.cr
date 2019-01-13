require "colorize"

require "dotenv"

Dotenv.load!

def help(*, error = nil, warning = nil)
  String.build do |str|
    str << <<-BANNER
      #{"Usage:".colorize.cyan}
        #{PROGRAM_NAME} <task_name> [options]

    BANNER
    if error
      str << "ERROR: ".colorize.red << error
    end
    if warning
      str << "WARNING: ".colorize.red << warning
    end
  end
end

TASKS = {} of String => Array(String) ->

def register_task(name, &impl : Array(String) ->)
  TASKS[name] = impl
end

require "./tools/**"


unless task_name = ARGV.first?
  puts help(error: "no task name given")
  exit
end

task = TASKS[task_name]

task.call(ARGV[1..-1])
