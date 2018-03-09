-- +micrate Up
CREATE TABLE "public"."teams" (
    "id" serial,
    "name" text,
    "captain_id" integer,
    "color" text,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("captain_id") REFERENCES "public"."accounts"("id")
);

CREATE TABLE "public"."runs" (
    "id" serial,
    "runner_id" integer,
    "game_id" integer,
    "team_id" integer,
    "pb" text,
    "estimate" text,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("runner_id") REFERENCES "public"."accounts"("id"),
    FOREIGN KEY ("game_id") REFERENCES "public"."games"("id"),
    FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id")
);
