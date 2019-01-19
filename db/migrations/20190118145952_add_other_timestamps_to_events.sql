-- +migrate up
ALTER TABLE "public"."events"
  ADD COLUMN "signups_open_time" timestamp without time zone,
  ADD COLUMN "signups_closed_time" timestamp without time zone,
  ADD COLUMN "runners_announced_time" timestamp without time zone;


-- +migrate down
ALTER TABLE "public"."events"
  DROP COLUMN "signups_open_time",
  DROP COLUMN "signups_closed_time",
  DROP COLUMN "runners_announced_time";
