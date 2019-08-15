-- +migrate up
CREATE TABLE "public"."ev_allowed_runs" (
  id serial,
  event_id integer,
  game_id integer,
  category_id integer,
  allowed boolean DEFAULT true,
  PRIMARY KEY("id"),
  FOREIGN KEY("event_id") REFERENCES "public"."ev_events"("id"),
  FOREIGN KEY("game_id") REFERENCES "public"."inv_games"("id"),
  FOREIGN KEY("category_id") REFERENCES "public"."inv_categories"("id")
);

CREATE INDEX "ev_allowed_runs_game_id_index" ON "public"."ev_allowed_runs"("event_id");

-- +migrate down
DROP TABLE "public"."ev_allowed_runs";
