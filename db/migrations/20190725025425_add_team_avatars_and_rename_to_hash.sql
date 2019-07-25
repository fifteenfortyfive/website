-- +migrate up
ALTER TABLE "public"."acc_accounts"
  RENAME COLUMN "avatar_object_id" TO "avatar_hash";

ALTER TABLE "public"."ev_events"
  RENAME COLUMN "avatar_object_id" TO "avatar_hash";

ALTER TABLE "public"."ev_teams"
  ADD COLUMN "icon_hash" text;

-- +migrate down
ALTER TABLE "public"."acc_accounts"
  RENAME COLUMN "avatar_hash" TO "avatar_object_id";

ALTER TABLE "public"."ev_events"
  RENAME COLUMN "avatar_hash" TO "avatar_object_id";

ALTER TABLE "public"."ev_teams"
  DROP COLUMN "icon_hash";
