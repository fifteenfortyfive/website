require "crinja"
require "crypto/bcrypt/password"

module Events
  @[Crinja::Attributes]
  class Event < Crecto::Model
    include Crinja::Object::Auto

    schema "events" do
      field :name, String
      field :start_time, Time
      field :end_time, Time
      field :description, String

      field :avatar_object_id, String
      field :link, String

      belongs_to :owner, Account, foreign_key: :owner_id
    end
  end
end
