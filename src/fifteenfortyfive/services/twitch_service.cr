require "http/client"
require "json"

module TwitchService
  extend self

  TWITCH_CLIENT = HTTP::Client.new(URI.parse("https://api.twitch.tv"))
  HEADERS = begin
    headers = HTTP::Headers.new
    headers["Client-ID"] = Constants::TWITCH_CLIENT_ID
    headers
  end

  ENDPOINTS = {
    users: "/helix/users",
    streams: "/helix/streams"
  }


  module Schemas
    struct UserData
      JSON.mapping(
        id: String,
        login: String,
        display_name: String,
        type: String,
        broadcaster_type: String,
        description: String,
        profile_image_url: String,
        offline_image_url: String,
        view_count: Int64,
        email: String?
      )
    end

    struct StreamData
      JSON.mapping(
        id: String,
        user_id: String,
        game_id: String,
        type: String,
        title: String,
        viewer_count: Int64,
        started_at: String,
        language: String,
        thumbnail_url: String
      )

      def in_community?(community_id : String)
        community_ids.includes?(community_id)
      end

      def live? : Bool
        self.type == "live"
      end

      def thumbnail_url(width=340, height=180)
        @thumbnail_url.gsub("{width}", width).gsub("{height}", height)
      end
    end

    struct ArrayResponse(T)
      JSON.mapping(
        data: Array(T)
      )
    end
  end


  def stream_link(channel)
    "https://twitch.tv/#{channel}"
  end


  def get_user_id_for(account : Accounts::Account)
    response = TWITCH_CLIENT.get(
      "#{ENDPOINTS[:users]}?login=#{account.twitch}",
      headers: HEADERS
    )

    return unless response.success?
    users_data = Schemas::ArrayResponse(Schemas::UserData).from_json(response.body).data
    return if users_data.empty?
    user_data = users_data.first

    stream_id = Streams.get_stream_id(account.id, "twitch")
    if stream_id
      Streams.update_stream_id(stream_id, {service_user_id: user_data.id})
    else
      Streams.create_stream_id({
        account_id: account.id,
        service: "twitch",
        service_user_id: user_data.id
      })
    end
  end


  def get_streams(ids : Array(String))
    id_params = ids.map do |id|
      "user_id=#{id}"
    end.join("&")

    response = TWITCH_CLIENT.get(
      "#{ENDPOINTS[:streams]}?first=#{Math.min(ids.size, 100)}&#{id_params}",
      headers: HEADERS
    )

    Schemas::ArrayResponse(Schemas::StreamData).from_json(response.body).data
  end
end
