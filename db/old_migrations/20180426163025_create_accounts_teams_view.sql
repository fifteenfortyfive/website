-- +migrate up
CREATE VIEW "public"."accounts_teams" AS
  SELECT accounts.id AS account_id, runs.team_id AS team_id
  FROM accounts
  LEFT JOIN runs ON runs.account_id = accounts.id
  WHERE team_id IS NOT NULL;

COMMENT ON VIEW "public"."accounts_teams" IS 'A view for directly getting the teams that an account is on';


-- +migrate down
DROP VIEW "public"."accounts_teams";
