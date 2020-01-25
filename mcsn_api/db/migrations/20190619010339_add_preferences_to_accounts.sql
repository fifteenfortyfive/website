-- +migrate up
ALTER TABLE "public"."accounts"
  ADD COLUMN "preference_overrides" jsonb;

-- +migrate down
ALTER TABLE "public"."accounts"
  DROP COLUMN "preference_overrides";
