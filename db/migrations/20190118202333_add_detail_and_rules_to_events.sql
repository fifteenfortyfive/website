-- +migrate up
ALTER TABLE "public"."events" RENAME COLUMN "description" TO "summary";
ALTER TABLE "public"."events"
  ADD COLUMN "details" text,
  ADD COLUMN "rules" text;

-- +migrate down
ALTER TABLE "public"."events" RENAME COLUMN "summary" TO "description";
ALTER TABLE "public"."events"
  DROP COLUMN "details",
  DROP COLUMN "rules";
