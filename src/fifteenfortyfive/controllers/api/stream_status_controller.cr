module API
  module StreamStatusController
    extend BaseController
    extend self

    module Schemas
      struct Status
        JSON.mapping(
          link: String,
          live: Bool
        )

        def initialize(@link : String, @live : Bool)
        end
      end
    end

    def index(env)
      account_ids = env.params.query["account_ids"].split(",")
      accounts = Repo.all(Account, Query.where(id: account_ids))

      response = {} of PkeyValue => Schemas::Status
      accounts.each do |account|
        response[account.id] = Schemas::Status.new(
          live: StreamStatusService.live?(account.id.not_nil!),
          link: TwitchService.stream_link(account.twitch)
        )
      end

      env.response.content_type = "application/json"
      response.to_json
    end
  end
end
