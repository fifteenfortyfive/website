require "auto_initialize"

module Accounts
  struct AccountPreferences
    include AutoInitialize
    include JSON::Serializable

    DEFAULT = self.new

    ###
    # General profile visibility
    ###

    property show_twitch : Bool = true
    property show_twitter : Bool = true
    property show_join_date : Bool = true
    property show_discord_username : Bool = false
    property show_discord_discriminator : Bool = false
    def show_discord_discriminator : Bool
      @show_discord_username && @show_discord_discriminator
    end
    property show_run_history : Bool = true


    ###
    # Statuses
    ###

    property show_streaming : Bool = true
    def show_streaming : Bool
      @show_twitch && @show_streaming
    end


    def merge(other : self) : self
      copy = self.dup

      copy.show_twitch = other.show_twitch
      copy.show_twitter = other.show_twitter
      copy.show_join_date = other.show_join_date
      copy.show_discord_username = other.show_discord_username
      copy.show_discord_discriminator = other.show_discord_discriminator
      copy.show_run_history = other.show_run_history
      copy.show_streaming = other.show_streaming

      copy
    end

    PREFERENCE_DESCRIPTIONS = {
      "show_twitch" => {
        name: "Display Twitch Username",
        type: "flag",
        default: true,
        section: "General",
        description: <<-DESC
          Allow your Twitch username to be displayed and linked across the site.
        DESC
      },
      "show_twitter" => {
        name: "Display Twitter Username",
        type: "flag",
        default: true,
        section: "General",
        description: <<-DESC
          Allow your Twitter username to be displayed and linked across the site.
        DESC
      },
      "show_join_date" => {
        name: "Display Join Date",
        type: "flag",
        default: true,
        section: "General",
        description: <<-DESC
          Allow the site to display how long you have been a member of the site.
        DESC
      },
      "show_discord_username" => {
        name: "Display Discord Username",
        type: "flag",
        default: false,
        section: "General",
        description: <<-DESC
          Allow the site to display your Discord username.
          This does not include the numbers after the name and is geenerally safe to display.
          Other users will generally only be able to identify you if they are in a Discord server with you.
        DESC
      },
      "show_discord_discriminator" => {
        name: "Display Discord Discriminator",
        type: "flag",
        requires: ["show_discord_username"],
        default: false,
        section: "General",
        description: <<-DESC
          Allow the site to display the numbers associated with your Discord username on the site.
          Enabling this setting will allow anyone to uniquely identify you on Discord, so be careful!
        DESC
      },
      "show_run_history" => {
        name: "Display Run History",
        type: "flag",
        default: true,
        section: "General",
        description: <<-DESC
          Allow the site to display full lists of past runs you have participated in, such as on your account profile.
          NOTE: This does not affect aggregate displays/statistics or listings on Events themselves.
        DESC
      },
      "show_streaming" => {
        name: "Track/Display Streaming Status (TBD)",
        type: "flag",
        requires: ["show_twitch"],
        default: true,
        section: "Statuses",
        description: <<-DESC
          Allow the site to track when you start and end streaming on Twitch and display this information in various places across the site.
        DESC
      },
    }
  end
end
