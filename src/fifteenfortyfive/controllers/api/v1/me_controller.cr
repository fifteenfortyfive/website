require "../../../services/file_upload_service"

class API::MeController < AppController
  def get
    account = @context.current_user

    render_json({account: serialize_me(account)})
  end

  def update_account
    account = @context.current_user

    changeset = Accounts.update_account(account, json_params["account"].as_h)

    if changeset.valid?
      updated_account = changeset.instance
      Streams.refresh_stream(updated_account)
      render_json({account: serialize_me(updated_account)})
    else
      render_error_json(Errors::Unprocessable)
    end
  end

  def update_avatar
    account = @context.current_user

    avatar_file = nil

    HTTP::FormData.parse(@context.request) do |part|
      if part.name == "avatar"
        avatar_file = FileUploadService.extract_image_from_multipart(part)
      end
    end

    unless avatar_file
      render_error_json(Errors::BadRequest)
      return
    end

    begin
      Accounts.set_account_avatar(account, avatar_file)

      render_json({
        succeeded: true,
      })
    rescue FileUploadService::UploadException
      render_error_json(Errors::Unprocessable)
    end
  ensure
    if avatar_file
      File.delete(avatar_file.path)
    end
  end

  private def serialize_me(account : Accounts::Account)
    # The current user bypasses all visibility restrictions on their own data.
    {
      id:                    account.id,
      username:              account.username,
      bio:                   account.bio,
      discord_username:      account.discord_username,
      discord_discriminator: account.discord_discriminator,
      discord_tag:           account.discord_tag,
      twitch:                account.twitch,
      twitter:               account.twitter,
      timezone:              account.timezone,
      admin:                 account.admin,
      avatar_hash:           account.avatar_hash,
      created_at:            account.created_at,
      updated_at:            account.updated_at,
    }
  end
end
