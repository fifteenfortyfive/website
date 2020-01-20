-- +migrate up
ALTER TABLE "public"."sched_activities"
  ADD CONSTRAINT unique_run_id_schedule_id UNIQUE (schedule_id, run_id);

-- +migrate down
ALTER TABLE "public"."sched_activities"
  DROP CONSTRAINT unique_run_id_schedule_id;
