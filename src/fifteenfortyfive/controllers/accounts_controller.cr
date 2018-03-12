require "awscr-s3"

module AccountsController
  extend BaseController
  extend self

  def _new(env)
    error = nil
    render_view "accounts/new"
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
    account.username  = env.params.body["username"]?.as?(String)
    account.password  = env.params.body["password"]?.as?(String)

    account.discord   = env.params.body["discord"]?.as?(String)
    account.twitch    = env.params.body["twitch"]?.as?(String)
    account.twitter   = env.params.body["twitter"]?.as?(String)

    account.timezone  = env.params.body["timezone"]?.as?(String)

    # Only override the avatar_object_id if the form included a
    # new file _and_ the upload succeeds.
    if avatar_file = env.params.files["avatar"]?
      if object_id = upload_avatar_object(avatar_file)
        account.avatar_object_id = object_id
      end
    end

    changeset = Repo.update(account)

    if changeset.valid?
      sign_in_user(env, changeset.instance)
      env.redirect("/")
    else
      render_view "accounts/edit"
    end
  end

  private def upload_avatar_object(file)
    filename = file.filename
    if !filename.is_a?(String) || filename.empty?
      return nil
    else
      object_id = UUID.random.to_s
      uploader = Awscr::S3::FileUploader.new(Constants::STORAGE_CLIENT)
      raw_file = File.open(file.tmpfile.path)
      uploader.upload(
        "fifteenfortyfive-assets",
        object_id,
        raw_file,
        # Avatar files need to be public for clients to load them easily.
        { "x-amz-acl" => "public-read" }
      )
      return object_id
    end
  end
end
