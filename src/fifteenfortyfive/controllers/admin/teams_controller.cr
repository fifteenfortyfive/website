module Admin::TeamsController
  extend BaseController
  extend self

  def index(env)
    submissions = Repo.all(GameSubmission, Query.order_by("game_id"), preload: [:game, :account])

    available_runs_json = JSON.build do |json|
      json.array do
        submissions.each do |sub|
          json.object do
            json.field "id", sub.id
            json.field "runner", sub.account.username
            json.field "runner_id", sub.account.id
            json.field "game", sub.game.name
            json.field "pb", sub.pb
            json.field "estimate", sub.estimate
            json.field "priority", sub.priority
          end
        end
      end
    end

    render_view "admin/teams/index"
  end
end
