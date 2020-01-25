-- +migrate up
ALTER TABLE "public"."games"
  ADD COLUMN "twitch_id" text;

-- +migrate down
ALTER TABLE "public"."games"
  DROP COLUMN "twitch_id";
