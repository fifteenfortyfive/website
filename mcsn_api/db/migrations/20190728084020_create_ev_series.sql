-- +migrate up
CREATE TABLE "public"."ev_series" (
  id serial,
  name text,
  description text,
  icon_hash text,
  PRIMARY KEY("id")
);

ALTER TABLE "public"."ev_events"
  ADD COLUMN "series_id" integer,
  ADD COLUMN "icon_hash" text,
  ADD FOREIGN KEY ("series_id") REFERENCES "public"."ev_series"("id");

-- +migrate down
ALTER TABLE "public"."ev_events"
  DROP COLUMN "series_id";
  DROP COLUMN "icon_hash";

DROP TABLE "public"."ev_series";
