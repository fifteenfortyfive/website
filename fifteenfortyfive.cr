require "kemal"
require "kilt/slang"
require "pg"
require "crecto"

require "./repo.cr"

require "./models/account.cr"
require "./models/session.cr"
require "./models/signup.cr"

require "./controllers/sessions.cr"
require "./controllers/accounts_controller.cr"
require "./controllers/registrations_controller.cr"
require "./controllers/static_controller.cr"
require "./controllers/signup_controller.cr"

Kemal.run
