require "kemal"
require "kilt/slang"
require "pg"
require "crecto"

require "./fifteenfortyfive/repo.cr"
require "./fifteenfortyfive/**"

add_handler FeatureFlagHandler.new

Kemal.run
