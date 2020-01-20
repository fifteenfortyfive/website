-- +migrate up
ALTER TABLE "public"."run_submissions"
  ADD COLUMN "category_id" integer,
  ADD FOREIGN KEY ("category_id") REFERENCES "public"."inv_categories"("id");

ALTER TABLE "public"."ev_runs"
  ADD COLUMN "category_id" integer,
  ADD FOREIGN KEY ("category_id") REFERENCES "public"."inv_categories"("id");

ALTER TABLE "public"."events"
  ADD COLUMN "category_id" integer,
  ADD FOREIGN KEY ("category_id") REFERENCES "public"."inv_categories"("id");


-- +migrate down
ALTER TABLE "public"."run_submissions"
  DROP COLUMN "category_id";

ALTER TABLE "public"."ev_runs"
  DROP COLUMN "category_id";

ALTER TABLE "public"."events"
  DROP COLUMN "category_id";
