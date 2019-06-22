
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
      render_json({account: serialize_me(updated_account)})
    else
      render_error_json(Errors::InvalidInput)
    end
  end


  private def serialize_me(account : Account)
    # The current user bypasses all visibility restrictions on their own data.
    {
      id: account.id,
      username: account.username,
      bio: account.bio,
      discord_username: account.discord_username,
      discord_discriminator: account.discord_discriminator,
      discord_tag: account.discord_tag,
      twitch: account.twitch,
      twitter: account.twitter,
      timezone: account.timezone,
      admin: account.admin,
      avatar_object_id: account.avatar_object_id,
      created_at: account.created_at,
      updated_at: account.updated_at
    }
  end
end
