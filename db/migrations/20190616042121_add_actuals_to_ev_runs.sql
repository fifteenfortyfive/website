-- +migrate up
ALTER TABLE "public"."ev_runs"
  ADD COLUMN "actual_seconds" integer;

-- +migrate down
ALTER TABLE "public"."ev_runs"
  DROP COLUMN "actual_seconds";
