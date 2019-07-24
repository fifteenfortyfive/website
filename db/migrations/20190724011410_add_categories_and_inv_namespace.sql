-- +migrate up
ALTER TABLE "public"."games"
  RENAME TO "inv_games";

CREATE TABLE "public"."inv_categories" (
  id serial,
  game_id integer,
  name text,
  description text,
  rules text,
  PRIMARY KEY("id"),
  FOREIGN KEY("game_id") REFERENCES "public"."inv_games"("id")
);

-- +migrate down
ALTER TABLE "public"."inv_games"
  RENAME TO "games";

DROP TABLE "public"."inv_categories";
