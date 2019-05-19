require "awscr-s3"
require "../contexts/accounts"

class AccountsController < AppController
  def new
    render("accounts/new.html.j2")
  end

  def create
    changeset = Accounts.create_account(body_params)

    if changeset.valid?
      sign_in_user(changeset.instance)
      redirect_to root_path
      spawn{ TwitchService.get_user_id_for(changeset.instance) }
    else
      render("accounts/new.html.j2")
    end
  end

  def show
    account = Accounts.get_account(url_params["id"])

    render("accounts/show.html.j2", {
      "account" => account
    })
  end

  def edit
    render("accounts/edit.html.j2")
  end

  def update
    account = @context.current_user

    HTTP::FormData.parse(@context.request) do |part|
      case part.name
      when "avatar"
        # TODO: figure out how to handle avatar uploads again
        # file = Tempfile.open("avatar_upload") do |f|
        #   IO.copy(part.body, f)
        # end

        # if object_id = upload_avatar_object(file)
        #   account.avatar_object_id = object_id
        # end

        # file.delete
      when "username"
        account.username  = part.body.gets_to_end
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

  private def upload_avatar_object(file)
    object_id = UUID.random.to_s
    uploader = Awscr::S3::FileUploader.new(Constants::STORAGE_CLIENT)
    uploader.upload(
      "fifteenfortyfive-assets",
      object_id,
      file,
      # Avatar files need to be public for clients to load them easily.
      { "x-amz-acl" => "public-read" }
    )
    return object_id
  end
end
