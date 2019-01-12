-- +migrate up
ALTER TABLE "public"."runs"
  ADD COLUMN "pb_seconds" integer,
  ADD COLUMN "estimate_seconds" integer;


-- +migrate down
ALTER TABLE "public"."runs"
  DROP COLUMN "pb_seconds",
  DROP COLUMN "estimate_seconds";
