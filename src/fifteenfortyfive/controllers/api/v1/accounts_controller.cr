require "../../../contexts/accounts"
require "../../errors"

class API::AccountsController < AppController
  def index
    accounts =
      if account_ids = query_params["account_ids"]?
        Accounts.list_accounts(Query.where(id: account_ids.split(',')))
      else
        Accounts.list_accounts()
      end

    render_json({
      accounts: accounts
    })
  end

  def get
    account_id = url_params["account_id"]?
    embed_params = url_params["embeds"]?
    embeds = embed_params ? Set.new(embed_params.split(',')) : Set(String).new

    unless account_id = url_params["account_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless account = Accounts.get_account(account_id)
      render_error_json(Errors::NotFound)
      return
    end

    runs = Events.list_runs(
        Query
          .where(account_id: account_id)
          .preload([:team, :game, :category, :event, :submission])
      )

    render_json({
      account: {
        id: account.id,
        username: account.username,
        bio: account.bio,
        twitch: account.preferences.show_twitch ? account.twitch : nil,
        twitter: account.preferences.show_twitter ? account.twitter : nil,
        discord_username: account.preferences.show_discord_username ? account.discord_username : nil,
        discord_discriminator: account.preferences.show_discord_discriminator ? account.discord_discriminator : nil,
        discord_tag: account.discord_tag,
        timezone: account.timezone,
        admin: account.admin,
        avatar_hash: account.avatar_hash,
        created_at: account.preferences.show_join_date ? account.created_at : nil,
        runs: account.preferences.show_run_history ? runs : [] of String
      }
    })
  end
end
