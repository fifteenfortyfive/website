require "pg"
require "crecto"
require "honcho"
require "awscr-s3"

require "dotenv"

Dotenv.load!("../.env")
APP_PORT           = ENV["PORT"].to_i
ANALYTICS_ENDPOINT = ENV["ANALYTICS_ENDPOINT"]

require "./mcsn/router.cr"
require "./mcsn/repo.cr"
require "./mcsn/controllers/app_controller.cr"
require "./mcsn/services/stream_status_service.cr"
require "./mcsn/live-api/socket_service.cr"
require "./analytics/analytics.cr"

visor = Honcho::Visor.new(strategy: Honcho::Strategy::ISOLATED)

# Delay restarting the stream status service by one full rate-limit window to avoid
# an infinite loop of timeouts.
visor.start_supervised("stream statuses", delay: 60.0, &->StreamStatusService.run)
visor.start_supervised("app[router]") do
  puts "app[router] is running on port #{APP_PORT}"
  AppRouter.listen(host: "0.0.0.0", port: APP_PORT)
end
# visor.start_supervised("analytics", delay: 1.0) do
#   puts "analytics service started"
#   Analytics.start_service(ANALYTICS_ENDPOINT)
#   Analytics.instance.run
# end
visor.start_supervised("socket service", &->SocketService.run)

visor.run
