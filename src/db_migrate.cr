require "micrate"
require "pg"
require "yaml"

CONFIG = YAML.parse(File.read("./repo_config.yaml"))

ARGV.unshift("up")

Micrate::DB.connection_url = ENV["DATABASE_URL"]? || CONFIG["DATABASE_URL"].to_s
Micrate::Cli.run
