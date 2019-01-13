-- +migrate up
ALTER TABLE "public"."teams" ADD COLUMN "current_run_index" integer DEFAULT '0';

-- +migrate down
ALTER TABLE "public"."teams" DROP COLUMN "current_run_index";
