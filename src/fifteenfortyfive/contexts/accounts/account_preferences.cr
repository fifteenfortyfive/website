require "auto_initialize"

module Accounts
  struct AccountPreferences
    include AutoInitialize
    include JSON::Serializable

    DEFAULT = self.new

    ###
    # General profile visibility
    ###

    # Allow their Twitch username to be displayed/linked
    property show_twitch : Bool = true
    # Allow their Twitter username to be displayed/linked
    property show_twitter : Bool = true
    # Allow displaying when they became a member of the site.
    property show_join_date : Bool = true
    # Allow runs to be displayed on their profile.
    # NOTE: This setting does not affect aggregations or displays as part of
    # event details.
    property show_run_history : Bool = true

    ###
    # Statuses
    ###

    # Allow tracking when they're streaming and displaying that information
    # across the site. This requires `show_twitch` to be true.
    property show_streaming : Bool = true
    def show_streaming : Bool
      @show_twitch && @show_streaming
    end


    def merge(other : self) : self
      copy = self.dup

      copy.show_twitch = other.show_twitch
      copy.show_twitter = other.show_twitter
      copy.show_join_date = other.show_join_date
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
          Allow your Twitter username to be displayed and linked across the site.
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
