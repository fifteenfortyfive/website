require "dotenv"
require "micrate"
require "pg"
require "yaml"

Dotenv.load!

Micrate::DB.connection_url = ENV["DATABASE_URL"]
Micrate::Cli.run
