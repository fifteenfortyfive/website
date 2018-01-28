require "kemal"
require "krout"
require "kilt/slang"
require "pg"
require "crecto"

require "./fifteenfortyfive/repo.cr"
require "./fifteenfortyfive/controllers/base_controller.cr"
require "./fifteenfortyfive/**"

add_handler SessionHandler.new
add_handler FeatureFlagHandler.new

Kemal.run
