-- +micrate Up
ALTER TABLE "public"."accounts" RENAME COLUMN "discord" TO "discord_username";
ALTER TABLE "public"."accounts"
  ADD COLUMN "discord_discriminator" text,
  ALTER COLUMN "twitch" DROP NOT NULL;

-- +micrate Down
ALTER TABLE "public"."accounts" RENAME COLUMN "discord_username" TO "discord";
ALTER TABLE "public"."accounts"
  DROP COLUMN "discord_discriminator",
  ALTER COLUMN "twitch" SET NOT NULL;
