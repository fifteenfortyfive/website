-- +micrate Up
ALTER TABLE "public"."games"
  ADD COLUMN "twitch_id" text;

-- +micrate Down
ALTER TABLE "public"."games"
  DROP COLUMN "twitch_id";
