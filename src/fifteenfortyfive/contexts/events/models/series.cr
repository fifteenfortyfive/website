module Events
  class Series < Crecto::Model
    schema "ev_series" do
      field :name, String
      field :description, String
      field :icon_hash, String

      has_many :events, Events::Event
    end
  end
end
