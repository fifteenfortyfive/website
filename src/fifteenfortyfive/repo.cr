module Repo
  extend Crecto::Repo

  config do |conf|
    conf.adapter  = Crecto::Adapters::Postgres
    conf.uri      = ENV["FIFTEENFORTYFIVE_DATABASE_URL"]? || ENV["DATABASE_URL"]? || ""
  end
end

Query = Crecto::Repo::Query
Multi = Crecto::Multi
Crecto::DbLogger.set_handler(STDOUT)
