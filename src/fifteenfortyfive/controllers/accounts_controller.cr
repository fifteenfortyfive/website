require "awscr-s3"
require "../contexts/accounts"

module AccountsController
  extend BaseController
  extend self

  def _new(env)
    error = nil
    Template.render(env, "accounts/new.html.j2")
  end

  def create(env)
    changeset = Accounts.create_account(env.params.body)

    if changeset.valid?
      sign_in_user(env, changeset.instance)
      env.redirect("/")
      spawn{ TwitchService.get_user_id_for(changeset.instance) }
    else
      pp changeset.errors
      Template.render(env, "accounts/new.html.j2")
    end
  end

  def show(env)
    account = Repo.get!(Account, env.params.url["id"])

    Template.render(env, "accounts/show.html.j2", {
      "account" => account
    })
  end

  def edit(env)
    unless env.current_user?
      env.redirect("/signin")
      return
    end

    Template.render(env, "accounts/edit.html.j2")
  end

  def update(env)
    unless env.current_user?
      env.redirect("/signin")
      return
    end

    account = env.current_user

    HTTP::FormData.parse(env.request) do |part|
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
      sign_in_user(env, changeset.instance)
      env.redirect("/")
      spawn{ TwitchService.get_user_id_for(account) }
    else
      Template.render(env, "accounts/edit.html.j2")
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
