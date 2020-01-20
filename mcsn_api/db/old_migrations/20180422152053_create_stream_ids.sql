-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."stream_ids" (
    "id" serial,
    "account_id" integer,
    "service" text,
    "service_user_id" text,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE CASCADE
);


-- +migrate down
DROP TABLE IF EXISTS "public"."stream_ids";
