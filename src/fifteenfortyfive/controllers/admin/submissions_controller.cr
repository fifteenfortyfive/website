module Admin::SubmissionsController
  extend BaseController
  extend self

  def index(env)
    runner_submissions      = Repo.all(RunnerSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    commentator_submissions = Repo.all(CommentatorSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    render_view "admin/submissions/index"
  end

  def runners(env)
    runner_submissions = Repo.all(RunnerSubmission, Query.where(revoked: "false"), preload: [:account]).sort_by{ |rs| rs.account.username.not_nil! }
    render_view "admin/submissions/runners"
  end

  def export(env)
    format = env.params.url["format"]? || "csv"
    runner_submissions = Repo.all(RunnerSubmission, preload: [:account]).sort_by{ |rs| rs.account.username.not_nil! }
    exporter = Export::Admin::RunnerSubmissions.new(runner_submissions)

    case format
    when "csv"
      send_file(env, exporter.to_csv.to_slice, "text/csv")
    else
      render_404(env)
    end
  end
end
