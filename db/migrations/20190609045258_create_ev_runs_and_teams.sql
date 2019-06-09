-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."ev_teams" (
  id serial,
  name text,
  color text,
  slug text,
  event_id integer,
  captain_id integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  FOREIGN KEY ("captain_id") REFERENCES "public"."accounts"("id"),
  FOREIGN KEY ("event_id") REFERENCES "public"."events"("id"),
);

CREATE TABLE IF NOT EXISTS "public"."ev_runs" (
  id serial,
  index integer,
  run_submission_id integer,
  account_id integer,
  events_id integer,
  team_id integer,
  game_id integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  FOREIGN KEY ("run_submission_id") REFERENCES "public"."run_submissions"("id"),
  FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id"),
  FOREIGN KEY ("events_id") REFERENCES "public"."events"("id"),
  FOREIGN KEY ("game_id") REFERENCES "public"."games"("id"),
  FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id")
);

-- +migrate down
DROP TABLE "public"."ev_runs";
DROP TABLE "public"."ev_teams";
