-- +migrate up
ALTER TABLE "public"."ev_runs"
  ADD COLUMN "pb_seconds" integer,
  ADD COLUMN "est_seconds" integer,
  ADD COLUMN "accepted" boolean DEFAULT false;

-- +migrate down
ALTER TABLE "public"."ev_runs"
  DROP COLUMN "pb_seconds",
  DROP COLUMN "est_seconds",
  DROP COLUMN "accepted";
