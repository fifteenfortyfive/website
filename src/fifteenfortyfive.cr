require "kemal"
require "krout"
require "kilt/slang"
require "pg"
require "crecto"
require "honcho"

require "./fifteenfortyfive/repo.cr"
require "./fifteenfortyfive/controllers/base_controller.cr"
require "./fifteenfortyfive/**"

require "./supervisor.cr"

add_handler SessionHandler.new
add_handler FeatureFlagHandler.new


visor = Honcho::Visor.new(strategy: Honcho::Strategy::ISOLATED)

visor.start_supervised("stream statuses", &->StreamStatusService.run)
visor.start_supervised("kemal", &->Kemal.run)

visor.run
