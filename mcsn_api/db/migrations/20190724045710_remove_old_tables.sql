-- !!This migration is non-reversible!!
-- This deletes all of the original, non-namespaced tables. Re-adding them is
-- possible, but not useful. All the data will be gone. Everything has been
-- verified as migrated already and running off the new tables for a while now.
--
-- This also renames all other tables into the appropriate namespaces.

-- +migrate up
ALTER TABLE IF EXISTS "public"."accounts"
  RENAME TO "acc_accounts";

ALTER TABLE IF EXISTS "public"."sessions"
  RENAME TO "acc_sessions";

ALTER TABLE IF EXISTS "public"."stream_ids"
  RENAME TO "streams_stream_ids";

ALTER TABLE IF EXISTS "public"."events"
  RENAME TO "ev_events";

ALTER TABLE IF EXISTS "public"."run_submissions"
  RENAME TO "ev_run_submissions";

DROP TABLE IF EXISTS "public"."feature_flags";
-- This data is nice, but old and irrelevant now. It was never used, either.
DROP TABLE IF EXISTS "public"."commentator_submissions";
DROP VIEW  IF EXISTS "public"."accounts_teams";
DROP TABLE IF EXISTS "public"."runs";
DROP TABLE IF EXISTS "public"."runner_submissions";
DROP TABLE IF EXISTS "public"."teams";
