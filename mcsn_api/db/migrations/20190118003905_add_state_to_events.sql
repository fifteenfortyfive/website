-- +migrate up
ALTER TABLE "public"."events"
  ADD COLUMN "state" text DEFAULT 'created';

-- +migrate down
ALTER TABLE "public"."events"
  DROP COLUMN "state";
