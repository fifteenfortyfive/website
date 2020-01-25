# Only run after `20180424205001_add_twitch_game_id_to_games.sql` has been run.
require "pg"
require "crecto"

require "../mcsn/repo.cr"
require "../mcsn/models/**"

# Pre-determined mapping of game names to their twitch IDs. Don't want to
# unnecessarily have to call out to Twitch for this info, which couldn't happen
# automatically anyway, since we don't currently store the full game names.
#
# Games added in the future will need to have this done automatically (e.g.,
# for other marathons).
GAME_IDS = {
  # Spyro the Dragon
  "Spyro 1" => "7182",
  # Spyro 2: Ripto's Rage
  "Spyro 2" => "1434",
  # Spyro: Year of the Dragon
  "Spyro 3" => "1598",
  # Crash Bandicoot
  "Crash 1" => "6756",
  # Crash Bandicoot 2: Cortex Strikes Back
  "Crash 2" => "7934",
  # Crash Bandicoot: Warped
  "Crash 3" => "11854",
  # Banjo-Kazooie
  "Kazooie" => "10033",
  # Banjo-Tooie
  "Tooie" => "2634",
  # Donkey Kong 64
  "DK64" => "13765",
  # Super Mario 64
  "SM64" => "2692",
  # Super Mario Sunshine
  "Sunshine" => "6086",
  # Super Mario Galaxy
  "Galaxy 1" => "14766",
  # Super Mario Galaxy 2
  "Galaxy 2" => "24239",
}

games = Repo.all(Game, Query.where(name: GAME_IDS.keys))

multi = Multi.new
games.each do |game|
  game.twitch_id = GAME_IDS[game.name]
  Repo.update(game)
end

Repo.transaction(multi)
