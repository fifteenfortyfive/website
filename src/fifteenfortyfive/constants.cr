module Constants
  # Brand links
  DISCORD_URL = "http://discord.fifteenfortyfive.org"
  TWITCH_URL  = "https://twitch.tv/1545race"
  TWITTER_URL = "https://twitter.com/1545race"
  SRCOM_URL   = "https://www.speedrun.com/1545"


  # Various Twitch configurations
  TWITCH_CLIENT_ID = ENV["TWITCH_CLIENT_ID"]
  TWITCH_COMMUNITY_ID = "50978467-0688-470d-8959-fd9863362400"


  # Asset Storage configuration (avatars, etc.)
  ASSETS_URL  = "https://fifteenfortyfive-assets.nyc3.digitaloceanspaces.com"
  STORAGE_CLIENT = Awscr::S3::Client.new(
    ENV["FIFTEENFORTYFIVE_ASSETS_REGION"],
    ENV["FIFTEENFORTYFIVE_ASSETS_KEY"],
    ENV["FIFTEENFORTYFIVE_ASSETS_SECRET"],
    endpoint: ENV["FIFTEENFORTYFIVE_ASSETS_ENDPOINT"]
  )

  def self.template_constants
    {
      "discord_url" => DISCORD_URL,
      "twitch_url" => TWITCH_URL,
      "twitter_url" => TWITTER_URL,
      "assets_url" => ASSETS_URL
    }
  end
end
