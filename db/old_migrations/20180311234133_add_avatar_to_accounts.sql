-- +migrate up
ALTER TABLE "public"."accounts" ADD COLUMN "avatar_object_id" text;


-- +migrate down
ALTER TABLE "public"."accounts" DROP COLUMN "avatar_object_id";
