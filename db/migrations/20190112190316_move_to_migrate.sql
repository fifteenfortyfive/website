-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."db_migrations" (
  "version_id" bigint
);

ALTER TABLE "public"."db_migrations"
  ADD COLUMN "applied_at" timestamp DEFAULT now();

-- +migrate down
DROP TABLE IF EXISTS "public"."db_migrations";
