-- +migrate up
ALTER TABLE "public"."run_submissions"
  ADD COLUMN "accepted" boolean DEFAULT false;

-- +migrate down
ALTER TABLE "public"."run_submissions"
  DROP COLUMN "accepted";
