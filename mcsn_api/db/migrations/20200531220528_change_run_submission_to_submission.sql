-- +migrate up
ALTER TABLE "run_runs"
  RENAME COLUMN "run_submission_id" TO "submission_id";

-- +migrate down
ALTER TABLE "run_runs"
  RENAME COLUMN "submission_id" TO "run_submission_id";
