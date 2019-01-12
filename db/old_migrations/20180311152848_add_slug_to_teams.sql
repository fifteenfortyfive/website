-- +migrate up
ALTER TABLE "public"."teams"
  ADD COLUMN "slug" text;

UPDATE "public"."teams" SET
  slug = regexp_replace(lower(name), E'\\s+', '-', 'g');

ALTER TABLE "public"."teams"
  ADD UNIQUE("slug");

-- +migrate down
ALTER TABLE "public"."teams"
  DROP COLUMN "slug";
