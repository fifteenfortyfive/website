require "../models/account"
require "../models/session"

module Accounts
  extend self

  SESSION_EXPIRATION_TIME = Time::Span.new(31, 0, 0, 0)


  ###
  # Accounts
  ###

  def list_accounts(query : Query = Query.new)
    Repo.all(Account, query)
  end

  def get_account(account_id, query : Query = Query.new)
    Repo.all(Account, query.where(id: account_id).limit(1)).first?
  end

  def get_account_for_session(session : Session)
    Repo.get(Account, session.account_id)
  end

  def new_account()
    Account.new
  end

  def create_account(attrs)
    account = Account.new
    account.admin = false
    account = account.cast(attrs)
    Repo.insert(account)
  end

  def update_account(account : Account, changes)
    changeset = account.cast(changes)
    Repo.update(changeset)
  end

  def delete_account(account : Account)
    Repo.delete(account)
  end



  ###
  # Sessions
  ###

  def get_session(session_id, query : Query = Query.new)
    Repo.all(Session, query.where(id: session_id)).first?
  end

  def get_valid_session(session_id, query : Query = Query.new)
    get_session(session_id, query.where(active: "true"))
  end

  def create_session(account : Account)
    session = Session.new.cast({
      "account_id" => account.id.to_s,
      "active" => true,
      "expires_at" => Time.now + SESSION_EXPIRATION_TIME
    })
    session.instance.id = Random::Secure.hex(32)
    session = Repo.insert(session)
    session.instance
  end

  def invalidate_session(session : Session)
    session.active = false
    Repo.update(session)
  end
end
