-- +migrate up
ALTER TABLE "public"."events"
  ADD COLUMN "game_id" integer,
  ADD COLUMN "category" text,
  ADD FOREIGN KEY ("game_id") REFERENCES "public"."games"("id");


-- +migrate down
ALTER TABLE "public"."events"
  DROP COLUMN "game_id",
  DROP COLUMN "category";
