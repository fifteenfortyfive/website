class Signup < Crecto::Model
  schema "signups" do
    field :discord, String
    field :twitch, String
    field :twitter, String, default: ""
    field :timezone, String, default: ""
    field :pair, String, default: ""
    field :avoid, String, default: ""
    field :max_games, String, default: ""
    field :max_time, String, default: ""
  end

  def initialize(json : JSON::Type)
    self.discord    = json["discord"].as(String)
    self.twitch     = json["twitch"].as(String)
    self.twitter    = json["twitter"].as(String)
    self.timezone   = json["timezone"].as(String)
    self.pair       = json["pair"].as(String)
    self.avoid      = json["avoid"].as(String)
    self.max_games  = json["max_games"].as(String)
    self.max_time   = json["max_time"].as(String)
  end
end
