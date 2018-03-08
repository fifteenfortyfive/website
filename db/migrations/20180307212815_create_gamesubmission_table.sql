-- +micrate Up
CREATE TABLE "public"."game_submissions" (
    "id" serial,
    "runner_submission_id" integer,
    "game_id" integer,
    "account_id" integer,
    "pb" text,
    "estimate" text,
    "priority" integer,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("runner_submission_id") REFERENCES "public"."runner_submissions"("id"),
    FOREIGN KEY ("game_id") REFERENCES "public"."games"("id"),
    FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id")
);
