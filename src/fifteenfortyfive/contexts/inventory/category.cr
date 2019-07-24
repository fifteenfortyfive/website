module Inventory
  class Category < Crecto::Model
    schema "inv_category" do
      belongs_to :game, Game

      field :name, String
      field :description, String
      field :rules, String
    end
  end
end
