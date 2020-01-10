require "crecto"

module Inventory
  class Game < Crecto::Model
    schema "inv_games" do
      field :name, String
      field :series, String
      field :progress_unit, String
      field :progress_max, String
      field :sequence_number, Int32

      field :twitch_id, String
      field :giantbomb_id, Int32

      field :description, String
      field :aliases, Array(String)

      has_many :categories, Category
    end
  end
end
