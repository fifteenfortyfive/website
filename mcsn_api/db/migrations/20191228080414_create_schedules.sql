-- +migrate up
CREATE TABLE "public"."sched_schedules" (
  id serial,
  name text,
  description text,
  est_start_time timestamp without time zone,
  est_end_time timestamp without time zone,
  actual_start_time timestamp without time zone,
  actual_end_time timestamp without time zone,
  actual_time_seconds integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  PRIMARY KEY("id")
);

CREATE TABLE "public"."sched_activities" (
  id  serial,
  index integer DEFAULT null,
  setup_seconds integer,
  teardown_seconds integer,
  est_seconds integer,
  actual_seconds integer,
  actual_start_time timestamp without time zone,
  actual_end_time timestamp without time zone,
  schedule_id integer,
  run_id integer,
  PRIMARY KEY("id"),
  FOREIGN KEY("schedule_id") REFERENCES "public"."sched_schedules"("id"),
  FOREIGN KEY("run_id") REFERENCES "public"."ev_runs"("id")
);

-- +migrate down
DROP TABLE "public"."sched_activities";
DROP TABLE "public"."sched_schedules";
