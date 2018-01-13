require "kemal"
require "kilt/slang"
require "pg"
require "crecto"

require "./repo.cr"

require "./models/account.cr"
require "./models/signup.cr"

require "./controllers/accounts_controller.cr"
require "./controllers/static_controller.cr"
require "./controllers/signup_controller.cr"


Kemal.run
