-- +migrate up
ALTER TABLE "public"."events"
  ADD COLUMN "start_time_is_estimate" boolean DEFAULT false,
  ADD COLUMN "end_time_is_estimate" boolean DEFAULT false;

-- +migrate down
ALTER TABLE "public"."events"
  DROP COLUMN "start_time_is_estimate",
  DROP COLUMN "end_time_is_estimate";
