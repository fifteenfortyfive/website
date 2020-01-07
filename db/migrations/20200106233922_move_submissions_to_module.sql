-- +migrate up
ALTER TABLE "ev_run_submissions"
  RENAME TO "sub_submissions";

ALTER TABLE "sub_submissions"
  RENAME COLUMN "runner_submission_id" TO "meta_id";

ALTER TABLE "ev_runner_submissions"
  RENAME TO "sub_submission_metas";

-- +migrate down
ALTER TABLE "sub_submissions"
  RENAME COLUMN "meta_id" TO "runner_submission_id";

ALTER TABLE "sub_submissions" RENAME TO "ev_run_submissions";

ALTER TABLE "sub_submission_metas" RENAME TO "ev_runner_submissions";
