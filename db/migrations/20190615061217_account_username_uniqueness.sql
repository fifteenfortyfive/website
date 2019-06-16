-- +migrate up
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_username_idx"
  ON "public"."accounts"("username");

-- +migrate down
DROP INDEX "public"."accounts_username_idx";
