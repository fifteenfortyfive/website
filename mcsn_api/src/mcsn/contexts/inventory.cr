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

  def new_game
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

  ###
  # Categories
  ###

  def list_categories(query : Query = Query.new)
    Repo.all(Category, query)
  end

  def get_category(category_id, query : Query = Query.new)
    Repo.all(Category, query.where(id: category_id).limit(1)).first?
  end

  def get_category!(category_id, query : Query = Query.new)
    Repo.all(Category, query.where(id: category_id).limit(1)).first
  end

  def new_category
    Category.new
  end

  def create_category(attrs)
    category = Category.new
    category = category.cast(attrs)
    Repo.insert(category)
  end

  def update_category(category : Category, changes)
    changeset = category.cast(changes)
    Repo.update(changeset)
  end

  def delete_category(category : Category)
    Repo.delete(category)
  end
end
