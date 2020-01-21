require "crecto"

module Events
  # AllowedRuns represent restrictions on what games/categories are allowed to
  # be submitted to an event.
  #
  # By default, this acts as a whitelist of runs, but toggling `allowed` to
  # false converts it to a blacklist. The full list is created by joining
  # all AllowedRun records for an event together. If no records are supplied,
  # the event is considered open to any kind of submission.
  #
  # Only one kind of restriction is allowed per event. Either all entries must
  # be allowances or all entries must be restrictions.
  #
  # Two levels of specificity are supported. Only supplying a `game` means any
  # run of that game is allowed/disallowed. Additionally supplying a `category`
  # means only runs of that particular combination are allowed/disallowed.
  class AllowedRun < Crecto::Model
    schema "ev_allowed_runs" do
      belongs_to :event, Event
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category

      field :allowed, Bool, default: true
    end
  end
end
