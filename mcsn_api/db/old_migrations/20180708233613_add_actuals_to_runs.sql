-- +migrate up
ALTER TABLE "public"."runs"
  ADD COLUMN "actual_start_time" timestamp without time zone,
  ADD COLUMN "actual_end_time" timestamp without time zone,
  ADD COLUMN "actual_time_seconds" integer;

-- +migrate down
ALTER TABLE "public"."runs"
  DROP COLUMN "actual_start_time",
  DROP COLUMN "actual_end_time",
  DROP COLUMN "actual_time_seconds";
