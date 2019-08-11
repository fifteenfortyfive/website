module Inventory
  class Game < Crecto::Model
    schema "inv_games" do
      field :name, String
      field :series, String
      field :progress_unit, String
      field :progress_max, String
      field :sequence_number, Int32
      field :default_splits, String

      field :twitch_id, String

      has_many :categories, Category
    end
  end
end
