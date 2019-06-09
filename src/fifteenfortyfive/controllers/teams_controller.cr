require "awscr-s3"
require "../contexts/accounts"

class TeamsController < AppController
  def index
    teams = Events.list_teams(Query.preload(:runs, Query.order_by("index ASC")).order_by("id ASC"))
    runs = teams.map(&.runs).flatten

    account_ids = runs.map(&.account_id)
    accounts = Accounts.list_accounts(Query.where(id: account_ids)).index_by(&.id.to_s)

    game_ids = runs.map(&.game_id)
    games = Inventory.list_games(Query.where(id: game_ids)).index_by(&.id.to_s)

    render("teams/index.html.j2", {
      "teams" => teams,
      "accounts" => accounts,
      "games" => games
    })
  end
end
