-- +migrate up
ALTER TABLE "public"."inv_games"
  DROP COLUMN "default_splits";

-- +migrate down
ALTER TABLE "public"."inv_games"
  ADD COLUMN "default_splits" text;
