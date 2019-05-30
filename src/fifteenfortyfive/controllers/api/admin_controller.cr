require "../../../contexts/events"

class API::AdminController < AppController
  def events
    events = Events.list_events()
    render_json({
      events: events.map do |event|
        {
          id: event.id,
          name: event.name,
          summary: event.summary,
          details: event.details,
          rules: event.rules,
          signups_open_time: event.signups_open_time,
          signups_closed_time: event.signups_closed_time,
          runners_announced_time: event.runners_announced_time,
          start_time: event.start_time,
          start_time_is_estimate: event.start_time_is_estimate,
          end_time: event.end_time,
          end_time_is_estimate: event.end_time_is_estimate,
          link: event.link,
          state: event.state,
          owner_id: event.owner_id
        }
      end
    })
  end

  def event
    event = Events.get_event!(url_params["event_id"], Query.preload(:runner_submissions, Query.preload(:run_submissions)))

    render_json(event)
  end

  def accounts
    accounts = Accounts.list_accounts()

    render_json(accounts)
  end

  def games
    games = Inventory.list_games()

    render_json(games)
  end
end
