-- +migrate up
ALTER TABLE "public"."ev_runs"
  ADD COLUMN "finished" boolean DEFAULT false;

-- +migrate down
ALTER TABLE "public"."ev_runs"
  DROP COLUMN "finished";
