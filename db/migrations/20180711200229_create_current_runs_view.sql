-- +micrate Up
CREATE OR REPLACE VIEW "public"."current_runs" AS SELECT ordered_runs.run_id,
    ordered_runs.schedule_index,
    ordered_runs.team_id,
    ordered_runs.account_id,
    ordered_runs.pb_seconds,
    ordered_runs.estimate_seconds,
    teams.name as team_name,
    accounts.username,
    accounts.twitch,
    accounts.twitter,
    accounts.avatar_object_id,
    games.name as game_name,
    games.series as game_series,
    games.progress_unit,
    games.progress_max
   FROM teams
     LEFT JOIN ( SELECT runs.id AS run_id,
            runs.team_id,
            runs.schedule_index,
            runs.game_id,
            runs.estimate_seconds,
            runs.pb_seconds,
            runs.account_id
           FROM runs
          WHERE runs.team_id IS NOT NULL
          ORDER BY runs.team_id, runs.schedule_index) ordered_runs ON ordered_runs.schedule_index = teams.current_run_index AND ordered_runs.team_id = teams.id
     LEFT JOIN accounts ON accounts.id = ordered_runs.account_id
     LEFT JOIN games ON games.id = ordered_runs.game_id;


-- +micrate Down
DROP VIEW "public"."current_runs";
