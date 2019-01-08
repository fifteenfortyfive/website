require "awscr-s3"

module AccountsController
  extend BaseController
  extend self

  def _new(env)
    error = nil
    Template.render(env, "accounts/new.html.j2")
  end

  def create(env)
    account = Account.new
    account.username  = env.params.body["username"]?.as?(String)
    account.password  = env.params.body["password"]?.as?(String)

    account.discord   = env.params.body["discord"]?.as?(String)
    account.twitch    = env.params.body["twitch"]?.as?(String)
    account.twitter   = env.params.body["twitter"]?.as?(String)

    account.timezone  = env.params.body["timezone"]?.as?(String)

    changeset = Repo.insert(account)

    if changeset.valid?
      sign_in_user(env, changeset.instance)
      env.redirect("/")
      spawn{ TwitchService.get_user_id_for(changeset.instance) }
    else
      render_view "accounts/new"
    end
  end

  def show(env)
    account = Repo.get!(Account, env.params.url["id"])

    render_view "accounts/show"
  end

  def edit(env)
    unless env.current_user?
      env.redirect("/signin")
      return
    end

    render_view "accounts/edit"
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
      when "discord"
        account.discord   = part.body.gets_to_end
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
      render_view "accounts/edit"
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
