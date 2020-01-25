require "../../../contexts/inventory"
require "../../errors"

class API::GamesController < AppController
  def index
    games =
      if game_ids = query_params["game_ids"]?
        Inventory.list_games(Query.where(id: game_ids.split(',')))
      else
        Inventory.list_games
      end

    render_json({
      games: games,
    })
  end

  def get
    unless game_id = url_params["game_id"]?
      render_error_json(Errors::NotFound)
      return
    end

    unless game = Inventory.get_game(game_id)
      render_error_json(Errors::NotFound)
      return
    end

    render_json({
      game: game,
    })
  end
end
