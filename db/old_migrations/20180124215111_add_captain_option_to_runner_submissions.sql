-- +migrate up
ALTER TABLE "runner_submissions"
  ADD COLUMN "captain" boolean DEFAULT 'false';
