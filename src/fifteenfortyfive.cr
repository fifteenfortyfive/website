require "kemal"
require "krout"
require "kilt/slang"
require "pg"
require "crecto"
require "honcho"

require "./fifteenfortyfive/repo.cr"
require "./fifteenfortyfive/controllers/base_controller.cr"
require "./fifteenfortyfive/**"

add_handler SessionHandler.new
add_handler FeatureFlagHandler.new


visor = Honcho::Visor.new(strategy: Honcho::Strategy::ISOLATED)

# Delay restarting the stream status service by one full rate-limit window to avoid
# an infinite loop of timeouts.
visor.start_supervised("stream statuses", delay: 60.0, &->StreamStatusService.run)
visor.start_supervised("kemal", &->Kemal.run)

visor.run
