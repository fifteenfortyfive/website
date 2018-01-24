require "kemal"
require "kilt/slang"
require "pg"
require "crecto"

require "./repo.cr"

require "./src/**"

Kemal.run
