-- +migrate up
ALTER TABLE "sched_schedules"
  ADD COLUMN "event_id" integer,
  ADD FOREIGN KEY ("event_id") REFERENCES "public"."ev_events"("id");

-- +migrate down
ALTER TABLE "sched_schedules"
  DROP COLUMN "event_id";
