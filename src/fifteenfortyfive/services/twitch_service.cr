require "http/client"
require "json"

require "../constants"

module TwitchService
  extend self

  TWITCH_CLIENT = HTTP::Client.new(URI.parse("https://api.twitch.tv"))
  HEADERS       = begin
    headers = HTTP::Headers.new
    headers["Client-ID"] = Constants::TWITCH_CLIENT_ID
    headers
  end

  ENDPOINTS = {
    users:   "/helix/users",
    streams: "/helix/streams",
  }

  module Schemas
    struct UserData
      include JSON::Serializable

      property id : String
      property login : String
      property display_name : String
      property type : String
      property broadcaster_type : String
      property description : String
      property profile_image_url : String
      property offline_image_url : String
      property view_count : Int64
      property email : String?
    end

    struct StreamData
      include JSON::Serializable

      property id : String
      property user_id : String
      property game_id : String
      property type : String
      property title : String
      property viewer_count : Int64
      property started_at : String
      property language : String
      property thumbnail_url : String

      def in_community?(community_id : String)
        community_ids.includes?(community_id)
      end

      def live? : Bool
        self.type == "live"
      end

      def thumbnail_url(width = 340, height = 180)
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
        account_id:      account.id,
        service:         "twitch",
        service_user_id: user_data.id,
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
