-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."ev_runner_submissions" (
    "id" serial,
    "account_id" integer,
    "event_id" integer,
    "max_games" integer,
    "max_time" text,
    "pair_with" text,
    "avoid" text,
    "captain" boolean DEFAULT false,
    "revoked" boolean DEFAULT false,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE CASCADE,
    FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE
);

-- +migrate down
DROP TABLE IF EXISTS "public"."ev_runner_submissions";
