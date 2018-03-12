-- +micrate Up
ALTER TABLE "public"."accounts" ADD COLUMN "avatar_object_id" text;


-- +micrate Down
ALTER TABLE "public"."accounts" DROP COLUMN "avatar_object_id";
