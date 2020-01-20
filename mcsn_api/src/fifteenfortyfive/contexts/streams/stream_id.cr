module Streams
  class StreamID < Crecto::Model
    schema "streams_stream_ids" do
      # Service is the service that provides the stream. At least for now, this
      # will always be "twitch".
      field :service, String
      field :service_user_id, String

      belongs_to :account, Accounts::Account

      set_created_at_field nil
      set_updated_at_field nil
    end
  end
end
