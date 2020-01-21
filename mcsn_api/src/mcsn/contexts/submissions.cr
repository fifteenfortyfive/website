require "crecto"

require "./submissions/**"

module Submissions
  extend self

  ###
  # Run Submissions
  ###

  def list_submissions(query : Query = Query.new)
    Repo.all(Submission, query)
  end

  def list_submissions_for_account(event_id, account_id)
    Repo.all(Submission, Query.where(account_id: account_id, event_id: event_id).order_by("rank ASC"))
  end

  def get_submission(submission_id, query : Query = Query.new)
    Repo.all(Submission, query.where(id: submission_id.to_s).limit(1)).first?
  end

  def get_submission!(submission_id, query : Query = Query.new)
    Repo.all(Submission, query.where(id: submission_id.to_s).limit(1)).first
  end

  def new_submission
    Submission.new
  end

  def create_submission(submission : Submission)
    Repo.insert(submission)
  end

  def create_submission(attrs)
    submission = Submission.new
    submission = submission.cast(attrs)
    Repo.insert(submission)
  end

  def update_submission(submission : Submission, changes)
    changeset = submission.cast(changes)
    Repo.update(changeset)
  end

  def delete_submission(submission : Submission)
    Repo.delete(submission)
  end

  def accept_submission(submission : Submission)
    submission.accepted = true
    Repo.update(submission)
  end

  def unaccept_submission(submission : Submission)
    submission.accepted = false
    Repo.update(submission)
  end

  ###
  # Runner Submissions
  ###

  def list_submission_meta(query : Query = Query.new)
    Repo.all(SubmissionMeta, query)
  end

  def get_submission_meta(submission_id, query : Query = Query.new)
    Repo.all(SubmissionMeta, query.where(id: submission_id.to_s).limit(1)).first?
  end

  def get_submission_meta!(submission_id, query : Query = Query.new)
    Repo.all(SubmissionMeta, query.where(id: submission_id.to_s).limit(1)).first
  end

  def get_submission_meta_for_account(event_id, account_id)
    query = Query.where(account_id: account_id, event_id: event_id)
    Repo.all(SubmissionMeta, query.limit(1)).first?
  end

  def get_submission_meta_for_account!(event_id, account_id)
    query = Query.where(account_id: account_id, event_id: event_id)
    Repo.all(SubmissionMeta, query.limit(1)).first
  end

  def new_submission_meta
    SubmissionMeta.new
  end

  def create_submission_meta(submission : SubmissionMeta)
    Repo.insert(submission)
  end

  def create_submission_meta(attrs)
    submission = SubmissionMeta.new
    submission = submission.cast(attrs)
    Repo.insert(submission)
  end

  def ensure_submission_meta!(event_id, account_id)
    if existing = get_submission_meta_for_account(event_id, account_id)
      return existing
    end

    changeset = create_submission_meta({
      event_id:   event_id,
      account_id: account_id,
    })

    changeset.instance
  end

  def update_submission_meta(submission : SubmissionMeta, changes)
    changeset = submission.cast(changes)
    Repo.update(changeset)
  end

  def delete_submission_meta(submission : SubmissionMeta)
    Repo.delete(submission)
  end

  def delete_existing_submissions(account_id, event_id)
    metas = Submissions.list_submission_meta(
      Query.where(account_id: account_id, event_id: event_id)
    )

    metas.each do |meta|
      run_submissions = Submissions.list_submissions(Query.where(meta_id: meta.id))
      run_submissions.each do |run|
        Submissions.delete_submission(run)
      end

      Submissions.delete_submission_meta(meta)
    end
  end
end
