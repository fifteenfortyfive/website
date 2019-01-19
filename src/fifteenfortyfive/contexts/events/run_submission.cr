require "crinja"

module Events
  @[Crinja::Attributes]
  class RunSubmission < Crecto::Model
    include Crinja::Object::Auto

    schema "run_submissions" do
      belongs_to :account, Account
      belongs_to :event, Event
      belongs_to :game, Inventory::Game
      field :category, String

      field :pb_seconds, Int64
      field :est_seconds, Int64

      field :comment, String

      field :revoked, Bool, default: false
    end
  end
end
