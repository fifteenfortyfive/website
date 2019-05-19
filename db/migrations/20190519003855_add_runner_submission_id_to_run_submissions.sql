-- +migrate up
ALTER TABLE "public"."run_submissions"
  ADD COLUMN "runner_submission_id" integer,
  ADD COLUMN "rank" integer DEFAULT 1,
  ADD FOREIGN KEY ("runner_submission_id") REFERENCES "public"."ev_runner_submissions"("id")  ON DELETE CASCADE;

-- +migrate down
ALTER TABLE "public"."run_submissions"
  DROP COLUMN "runner_submission_id",
  DROP COLUMN "rank";
