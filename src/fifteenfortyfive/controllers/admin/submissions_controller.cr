module Admin::SubmissionsController
  extend BaseController
  extend self

  def index(env)
    runner_submissions      = Repo.all(RunnerSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    commentator_submissions = Repo.all(CommentatorSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    render_view "admin/submissions/index"
  end

  def runners(env)
    runner_submissions      = Repo.all(RunnerSubmission, Query.order_by("updated_at DESC").where(revoked: "false"), preload: [:account])

    render_view "admin/submissions/runners"
  end
end
