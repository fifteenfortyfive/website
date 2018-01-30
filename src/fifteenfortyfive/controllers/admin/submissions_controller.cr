module Admin::SubmissionsController
  extend BaseController
  extend self

  def index(env)
    unless env.current_user? && env.current_user.admin
      render_404
      return
    end

    runner_submissions      = Repo.all(RunnerSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    commentator_submissions = Repo.all(CommentatorSubmission, Query.order_by("updated_at DESC"), preload: [:account])
    render_view "admin/submissions/index"
  end
end
