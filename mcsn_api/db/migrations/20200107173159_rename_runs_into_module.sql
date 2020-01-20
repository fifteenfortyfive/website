-- +migrate up
ALTER TABLE "ev_runs" RENAME TO "run_runs";
ALTER TABLE "ev_run_events" RENAME TO "run_events";

-- +migrate down
ALTER TABLE "run_runs" RENAME TO "ev_runs";
ALTER TABLE "run_events" RENAME TO "ev_run_events";
