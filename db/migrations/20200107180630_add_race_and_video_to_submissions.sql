-- +migrate up
ALTER TABLE "sub_submissions"
  ADD COLUMN "will_race" boolean DEFAULT false,
  ADD COLUMN "video" text;

-- +migrate down
ALTER TABLE "sub_submissions"
  DROP COLUMN "will_race",
  DROP COLUMN "video";
