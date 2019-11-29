require "./streams/**"
require "crecto"

module Streams
  extend self

  ###
  # StreamIDs
  ###

  def list_stream_ids(query : Query = Query.new)
    Repo.all(StreamID, query)
  end

  def get_stream_id(account_id, service, query : Query = Query.new)
    Repo.all(StreamID, query.where(service: service, account_id: account_id.to_s).limit(1)).first?
  end

  def get_stream_id!(account_id, service, query : Query = Query.new)
    Repo.all(StreamID, query.where(service: service, account_id: account_id.to_s).limit(1)).first
  end

  def get_stream_id_from_service_id(service_user_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(service_user_id: service_user_id.to_s).limit(1)).first?
  end

  def get_stream_id_from_service_id!(service_user_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(service_user_id: service_user_id.to_s).limit(1)).first
  end

  def new_stream_id
    StreamID.new
  end

  def create_stream_id(attrs)
    stream_id = StreamID.new
    stream_id = stream_id.cast(attrs)
    Repo.insert(stream_id)
  end

  def update_stream_id(stream_id : StreamID, changes)
    changeset = stream_id.cast(changes)
    Repo.update(changeset)
  end

  def delete_stream_id(stream_id : StreamID)
    Repo.delete(stream_id)
  end

  def delete_stream_ids_for_account(account_id)
    Repo.delete_all(StreamID, Query.where(account_id: account_id.to_s))
  end

  ###
  # Stream status
  ###

  def list_streams_by_account
    StreamStatusService.statuses
  end

  def get_stream(account_id : StreamStatusService::KeyType)
    StreamStatusService.get(account_id)
  end

  def refresh_stream(account : Accounts::Account)
    if account.preferences.show_streaming
      spawn do
        TwitchService.get_user_id_for(account)
      end
    else
      StreamStatusService.clear!(account.id.as(Int32 | Int64))
      delete_stream_ids_for_account(account.id)
    end
  end
end
