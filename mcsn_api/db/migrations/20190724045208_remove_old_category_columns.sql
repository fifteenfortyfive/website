-- +migrate up
ALTER TABLE "public"."events"
  DROP COLUMN "category";

ALTER TABLE "public"."run_submissions"
  DROP COLUMN "category";

-- +migrate down
ALTER TABLE "public"."events"
  ADD COLUMN "category" text;

ALTER TABLE "public"."run_submissions"
  ADD COLUMN "category" text;
