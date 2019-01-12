-- +migrate up
DROP TABLE "runs";
ALTER TABLE "public"."game_submissions" RENAME TO "runs";

ALTER TABLE "public"."runs"
  ADD COLUMN "team_id" integer,
  ADD FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id");
