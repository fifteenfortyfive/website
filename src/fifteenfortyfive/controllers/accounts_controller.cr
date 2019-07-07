require "tempfile"

require "awscr-s3"
require "../contexts/accounts"

class AccountsController < AppController
  def new
    render("accounts/new.html.j2")
  end

  def create
    changeset = Accounts.create_account(body_params)

    if changeset.valid?
      account = changeset.instance
      sign_in_user(account)
      redirect_to root_path
      Streams.refresh_stream(account)
    else
      render("accounts/new.html.j2")
    end
  end

  def show
    account_id = url_params["id"]
    account = Accounts.get_account(account_id)
    runs = Events.list_runs(Query.where(account_id: account_id).preload([:team, :game, :event, :submission])).sort_by(&.event.start_time!).reverse.group_by(&.event)

    render("accounts/show.html.j2", {
      "account" => account,
      "runs" => runs
    })
  end

  def edit
    render("accounts/edit.html.j2")
  end

  def update
    account = @context.current_user

    HTTP::FormData.parse(@context.request) do |part|
      case part.name
      when "username"
        account.username  = part.body.gets_to_end
      when "bio"
        account.bio  = part.body.gets_to_end
      when "password"
        account.password  = part.body.gets_to_end
      when "discord_username"
        account.discord_username      = part.body.gets_to_end
      when "discord_discriminator"
        account.discord_discriminator = part.body.gets_to_end
      when "twitch"
        account.twitch    = part.body.gets_to_end
      when "twitter"
        account.twitter   = part.body.gets_to_end
      when "timezone"
        account.timezone  = part.body.gets_to_end
      end
    end

    changeset = Repo.update(account)

    if changeset.valid?
      sign_in_user(changeset.instance)
      redirect_to root_path
      spawn{ TwitchService.get_user_id_for(account) }
    else
      render("accounts/edit.html.j2")
    end
  end
end
