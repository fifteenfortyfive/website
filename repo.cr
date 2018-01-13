require "yaml"

CONFIG = YAML.parse(File.read("./repo_config.yaml"))

module Repo
  extend Crecto::Repo

  config do |conf|
    conf.adapter  = Crecto::Adapters::Postgres
    conf.uri      = ENV["DATABASE_URL"]? || CONFIG["DATABASE_URL"].as_s
    conf.database = "fifteenfortyfive"
    conf.hostname = "localhost"
    conf.username = CONFIG["USERNAME"].to_s
    conf.password = CONFIG["PASSWORD"].to_s
    conf.port = 5432
  end
end

Query = Crecto::Repo::Query
Crecto::DbLogger.set_handler(STDOUT)
