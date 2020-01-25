-- +migrate up
ALTER TABLE "public"."runs" ADD COLUMN "schedule_index" integer;


-- +migrate down
ALTER TABLE "public"."runs" DROP COLUMN "schedule_index";
