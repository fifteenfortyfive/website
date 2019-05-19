-- +migrate up
CREATE TABLE IF NOT EXISTS "public"."analytics_events" (
  "id" serial,
  "type" text,
  "raw_data" text,
  "raw_meta" text,
  "timestamp" timestamp without time zone,
  PRIMARY KEY ("id")
);

-- +migrate down
DROP TABLE IF EXISTS "public"."analytics_events";
