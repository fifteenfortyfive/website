require "../models/stream_id"
require "crecto"

module Streams
  extend self


  ###
  # StreamIDs
  ###

  def list_stream_ids(query : Query = Query.new)
    Repo.all(StreamID, query)
  end

  def get_stream_id(account_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(id: account_id.to_s).limit(1)).first?
  end

  def get_stream_id!(account_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(id: account_id.to_s).limit(1)).first
  end

  def get_stream_id_from_service_id(service_user_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(service_user_id: service_user_id.to_s).limit(1)).first?
  end

  def get_stream_id_from_service_id!(service_user_id, query : Query = Query.new)
    Repo.all(StreamID, query.where(service_user_id: service_user_id.to_s).limit(1)).first
  end

  def new_stream_id()
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
end
