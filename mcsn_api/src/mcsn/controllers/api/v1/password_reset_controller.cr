require "http/client"

require "../../../constants"
require "../../../contexts/accounts"
require "../../errors"

class API::PasswordResetController < AppController
  def create
    requested_username = json_params["username"]?.try(&.as_s?)
    return if requested_username.nil? || requested_username.size <= 1

    similar_query = Query.where("username ILIKE ?", ["%#{requested_username}%"]).limit(10)
    similar_accounts = Accounts.list_accounts(similar_query)
    formatted_matches = similar_accounts.map do |account|
      "**#{account.username}** - #{account.discord_tag(force: true)} (id: #{account.id})"
    end
    matches_field_value =
      if formatted_matches.size == 0
        "No immediate matches"
      else
        formatted_matches.join("\n")
      end

    domain = @context.request.host

    embed_body = {
      embeds: [{
        title:       "Password Reset Request",
        description: "A user has requested a password reset from #{domain}",
        color:       14784078, # Light orange
        timestamp:   Time.utc,
        fields:      [
          {name: "Requested Username", value: requested_username},
          {name: "Matching Users", value: matches_field_value},
        ],
      }],
    }

    headers = HTTP::Headers.new
    headers["Content-Type"] = "application/json"
    response = HTTP::Client.post(Constants::PASSWORD_RESET_WEBHOOK_URL, headers, embed_body.to_json)

    render_json({
      succeeded: (200..299).includes?(response.status_code),
    })
  end
end
