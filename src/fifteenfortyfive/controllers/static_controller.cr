module StaticController
  extend self

  def index(env)
    runner_submissions = Repo.all(RunnerSubmission)
    commentator_submissions = Repo.all(CommentatorSubmission)
    render_view "static/index"
  end
end
