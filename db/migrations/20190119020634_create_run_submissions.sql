-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."run_submissions" (
    "id" serial,
    "account_id" integer,
    "event_id" integer,
    "game_id" integer,
    "category" text,
    "pb_seconds" integer,
    "est_seconds" integer,
    "comment" text,
    "revoked" boolean DEFAULT false,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE CASCADE,
    FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE,
    FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE
);

-- +migrate down
DROP TABLE IF EXISTS "public"."run_submissions";
