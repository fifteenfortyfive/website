-- +micrate Up
ALTER TABLE "public"."runs" ADD COLUMN "schedule_index" integer;


-- +micrate Down
ALTER TABLE "public"."runs" DROP COLUMN "schedule_index";
