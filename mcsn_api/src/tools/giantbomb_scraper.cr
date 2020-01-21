require "http/client"
require "json"

require "pg"
require "crecto"
require "dotenv"
Dotenv.load!

require "../mcsn/contexts/inventory"
require "../mcsn/repo"

API_KEY = ENV["GIANTBOMB_API_KEY"]

struct GB::Response(T)
  include JSON::Serializable

  property status_code : Int32
  property error : String
  property number_of_total_results : Int32
  property number_of_page_results : Int32
  property limit : Int32
  property offset : Int32

  property results : Array(T)
end

struct GB::Game
  include JSON::Serializable

  property name : String
  property aliases : String?
  property api_detail_url : String
  property date_added : String
  property date_last_updated : String
  property deck : String?
  property description : String?
  property expected_release_day : Int32?
  property expected_release_month : Int32?
  property expected_release_quarter : Int32?
  property expected_release_year : Int32?
  property guid : String
  property id : Int32
  property original_release_date : String?
end

def make_games_url(*, offset = 0, limit = 100)
  "https://www.giantbomb.com/api/games/?api_key=#{API_KEY}&format=json&limit=#{limit}&offset=#{offset}"
end

offset = 0
limit = 100

loop do
  puts "requesting games #{offset}-#{limit} from Giantbomb"
  http_response = HTTP::Client.get(make_games_url(offset: offset, limit: limit))
  response = GB::Response(GB::Game).from_json(http_response.body)

  offset = offset + response.number_of_page_results
  limit = 100

  response.results.each do |game|
    Inventory.create_game({
      name:         game.name,
      description:  game.description,
      aliases:      game.aliases ? game.aliases.not_nil!.split(',') : [] of String,
      giantbomb_id: game.id,
    })
  end

  if offset >= response.number_of_total_results
    break
  end

  sleep(20)
end
