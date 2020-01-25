-- +migrate up
ALTER TABLE "public"."accounts"
  ADD COLUMN "bio" varchar(140);

-- +migrate down
ALTER TABLE "public"."accounts"
  DROP COLUMN "bio";
