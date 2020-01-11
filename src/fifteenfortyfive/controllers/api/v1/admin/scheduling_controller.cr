require "../../../../contexts/events"
require "../../../errors"

class API::Admin::SchedulingController < AppController
  def get
    event_id = url_params["event_id"]
    schedule = Schedules.get_event_schedule(event_id)
    runs = Events.list_available_runs_for_event(event_id)
    event = Events.get_event(event_id)

    render_json({
      schedule:   schedule,
      runs:       runs,
      runners:    Accounts.list_accounts(Query.where(id: runs.map(&.account_id))),
      games:      Inventory.list_games(Query.where(id: runs.map(&.game_id))),
      categories: Inventory.list_categories(Query.where(id: runs.map(&.category_id))),
      event:      event,
    })
  end
end
