-- +migrate up
CREATE TABLE "public"."ev_run_events" (
  id serial,
  run_id integer,
  type text,
  occurred_at timestamp without time zone,
  FOREIGN KEY("run_id") REFERENCES "public"."ev_runs"("id"),
  PRIMARY KEY("id")
);

-- +migrate down
DROP TABLE "public"."ev_run_events";
