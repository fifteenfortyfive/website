-- +micrate Up
ALTER TABLE "public"."teams" ADD COLUMN "current_run_index" integer DEFAULT '0';

-- +micrate Down
ALTER TABLE "public"."teams" DROP COLUMN "current_run_index";
