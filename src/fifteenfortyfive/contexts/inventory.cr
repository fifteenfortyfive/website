require "./inventory/**"
require "crecto"

module Inventory
  extend self


  ###
  # Games
  ###

  def list_games(query : Query = Query.new)
    Repo.all(Game, query)
  end

  def get_game(game_id, query : Query = Query.new)
    Repo.all(Game, query.where(id: game_id).limit(1)).first?
  end

  def get_game!(game_id, query : Query = Query.new)
    Repo.all(Game, query.where(id: game_id).limit(1)).first
  end

  def new_game()
    Game.new
  end

  def create_game(attrs)
    game = Game.new
    game = game.cast(attrs)
    Repo.insert(game)
  end

  def update_game(game : Game, changes)
    changeset = game.cast(changes)
    Repo.update(changeset)
  end

  def delete_game(game : Game)
    Repo.delete(game)
  end
end
