-- +micrate Up
ALTER TABLE "public"."runs"
  ADD COLUMN "featured" boolean DEFAULT 'false',
  ADD COLUMN "feature_index" integer;

CREATE OR REPLACE VIEW "public"."featured_runs" AS  SELECT runs.id AS run_id,
    runs.feature_index,
    runs.schedule_index,
    runs.team_id,
    runs.account_id,
    runs.pb,
    runs.estimate,
    runs.pb_seconds,
    runs.estimate_seconds,
    runs.actual_start_time,
    runs.actual_end_time,
    runs.actual_time_seconds,
    teams.name AS team_name,
    teams.color AS team_color,
    accounts.username,
    accounts.twitch,
    accounts.twitter,
    accounts.avatar_object_id,
    games.name AS game_name,
    games.series AS game_series,
    games.progress_unit,
    games.progress_max
   FROM runs
     LEFT JOIN teams ON teams.id = runs.team_id
     LEFT JOIN accounts ON accounts.id = runs.account_id
     LEFT JOIN games ON games.id = runs.game_id
  WHERE runs.featured = true
  ORDER BY runs.feature_index;



-- +micrate Down
DROP VIEW "public"."featured_runs";

ALTER TABLE "public"."runs"
  DROP COLUMN "featured",
  DROP COLUMN "feature_index";
