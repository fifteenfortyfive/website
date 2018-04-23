-- +micrate Up
CREATE TABLE "public"."stream_ids" (
    "id" serial,
    "account_id" integer,
    "service" text,
    "service_user_id" text,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE CASCADE
);


-- +micrate Down
DROP TABLE "public"."stream_ids";
