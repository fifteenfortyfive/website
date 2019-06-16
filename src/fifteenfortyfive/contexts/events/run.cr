require "crinja"
require "crypto/bcrypt/password"

module Events
  @[Crinja::Attributes]
  class Run < Crecto::Model
    include Crinja::Object::Auto

    schema "ev_runs" do
      belongs_to :submission, RunSubmission
      belongs_to :event, Event

      belongs_to :team, Team
      belongs_to :account, Account
      belongs_to :game, Inventory::Game

      field :pb_seconds, Int32
      field :est_seconds, Int32
      field :actual_seconds, Int32

      field :finished, Bool, default: false

      field :index, Int32
      field :accepted, Bool, default: false
    end
  end
end
