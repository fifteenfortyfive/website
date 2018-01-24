module Repo
  extend Crecto::Repo

  config do |conf|
    conf.adapter  = Crecto::Adapters::Postgres
    conf.uri      = ENV["DATABASE_URL"]? || ""
  end
end

Query = Crecto::Repo::Query
Crecto::DbLogger.set_handler(STDOUT)
