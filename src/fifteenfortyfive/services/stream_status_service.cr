require "./twitch_service.cr"

module StreamStatusService
  extend self

  alias KeyType = Int32 | Int64
  alias Stream = TwitchService::Schemas::StreamData
  class_property statuses = {} of KeyType => Stream

  # Returns all accounts that are currently live.
  def live
    @@statuses.select{ |_, stream| stream.live? }
  end
  def live(community : String)
    @@statuses.select{ |_, stream| stream.live? && stream.in_community?(community) }
  end

  # Returns true if the given account is currently streaming.
  def live?(account_id : KeyType) : Bool
    @@statuses[account_id]?.try(&.live?) || false
  end
  def live?(account : Account)
    self.live?(account.id)
  end


  def run
    loop do
      streams = next_stream_id_chunk
      stream_ids = streams.map(&.service_user_id).compact
      live_streams = TwitchService.get_streams(stream_ids).index_by(&.user_id)

      streams.each do |stream|
        if stream_data = live_streams[stream.service_user_id]?
          @@statuses[stream.account_id.as(Int64)] = stream_data
        else
          @@statuses.delete(stream.account_id.as(Int64))
        end
      end

      sleep(10)
    end
  end

  def run_in_background
    spawn run
  end


  @@cached_streams = [] of StreamID

  private def next_stream_id_chunk(size = 100)
    # If the cache doesn't have enough entries to fill the chunk, re-query the
    # table to ensure that any new entries are included (e.g., a new account
    # is added, or someone links a different twitch account).
    if @@cached_streams.size < size
      @@cached_streams += Repo.all(StreamID, Query.order_by("id ASC"))
    end

    @@cached_streams.shift(size)
  end
end
