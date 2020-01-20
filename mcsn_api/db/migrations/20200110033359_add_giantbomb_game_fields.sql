-- +migrate up
ALTER TABLE "inv_games"
  ADD COLUMN "aliases" text[],
  ADD COLUMN "giantbomb_id" integer,
  ADD COLUMN "description" text;

-- +migrate down
ALTER TABLE "inv_games"
  DROP COLUMN "aliases",
  DROP COLUMN "giantbomb_id",
  DROP COLUMN "description";
