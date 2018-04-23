module Constants
  DISCORD_URL = "http://discord.fifteenfortyfive.org"
  TWITCH_URL  = "https://twitch.tv/1545race"
  TWITTER_URL = "https://twitter.com/1545race"

  TWITCH_CLIENT_ID = ENV["TWITCH_CLIENT_ID"]

  STORAGE_CLIENT = Awscr::S3::Client.new(
    ENV["FIFTEENFORTYFIVE_ASSETS_REGION"],
    ENV["FIFTEENFORTYFIVE_ASSETS_KEY"],
    ENV["FIFTEENFORTYFIVE_ASSETS_SECRET"],
    endpoint: ENV["FIFTEENFORTYFIVE_ASSETS_ENDPOINT"]
  )
  ASSETS_URL  = "https://fifteenfortyfive-assets.nyc3.digitaloceanspaces.com"
end
