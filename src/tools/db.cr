require "dotenv"
Dotenv.load!

require "migrate"
require "pg"

MIGRATIONS_PATH = File.join("db", "migrations")

def db_migrator
  Migrate::Migrator.new(
    DB.open(ENV["DATABASE_URL"]),
    Logger.new(STDOUT),
    MIGRATIONS_PATH, # Path to migrations
    "db_migrations", # Version table name
    "version_id"     # Version column name
  )
end

register_task "db:migrate" do |args|
  m = db_migrator()
  m.to_latest
end

register_task "db:rollback" do |args|
  m = db_migrator()
  m.down
end

register_task "db:redo" do |args|
  m = db_migrator()
  m.redo
end

register_task "db:version" do |args|
  m = db_migrator()
  puts m.current_version
end

register_task "db:migrate:new" do |args|
  file_name = args[0]
  unique_name = Time.utc_now.to_s("%Y%m%d%H%M%S_#{file_name}.sql")
  file_path = File.join(MIGRATIONS_PATH, unique_name)
  File.open(file_path, "w") do |f|
    f << <<-CONTENT
    -- +migrate up

    -- +migrate down
    CONTENT
  end
end
