-- +migrate up
ALTER TABLE "public"."ev_runs"
  ADD COLUMN "started_at" timestamp without time zone,
  ADD COLUMN "finished_at" timestamp without time zone;

-- +migrate down
ALTER TABLE "public"."ev_runs"
  DROP COLUMN "started_at",
  DROP COLUMN "finished_at";
