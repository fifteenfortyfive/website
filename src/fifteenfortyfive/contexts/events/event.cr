require "crinja"
require "crypto/bcrypt/password"

module Events
  @[Crinja::Attributes]
  class Event < Crecto::Model
    include Crinja::Object::Auto

    STATES = [
      "created",
      "signups open",
      "signups closed",
      "runners announced",
      "scheduled",
      "in progress",
      "completed",
      "cancelled"
    ]

    schema "events" do
      field :name, String
      field :start_time, Time
      field :end_time, Time
      field :description, String

      field :avatar_object_id, String
      field :link, String

      field :state, String, default: "created"

      belongs_to :owner, Account, foreign_key: :owner_id
      has_many :runs, Run
    end

    @[Crinja::Attribute]
    def available_states
      STATES
    end
  end
end
