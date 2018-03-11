-- +micrate Up
ALTER TABLE "public"."teams"
  ADD COLUMN "slug" text;

UPDATE "public"."teams" SET
  slug = regexp_replace(lower(name), E'\\s+', '-', 'g');

ALTER TABLE "public"."teams"
  ADD UNIQUE("slug");

-- +micrate Down
ALTER TABLE "public"."teams"
  DROP COLUMN "slug";
