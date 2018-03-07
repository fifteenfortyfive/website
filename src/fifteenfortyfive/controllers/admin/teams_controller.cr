module Admin::TeamsController
  extend BaseController
  extend self

  def index(env)
    submissions = Repo.all(RunnerSubmission, Query.where(revoked: "false").order_by("account_id"), preload: [:account])

    available_runs_json = JSON.build do |json|
      json.array do
        submissions.each do |sub|
          sub.games.each do |game|
            json.object do
              json.field "runner", sub.account.username
              json.field "runner_id", sub.account.id
              json.field "game", game["game"].as(Hash(String, JSON::Type))["short_name"]
              json.field "estimate", game["est"]
              json.field "pb", game["pb"]
              json.field "preference", 1 + (sub.games.index(game) || 0)
            end
          end
        end
      end
    end

    render_view "admin/teams/index"
  end
end
