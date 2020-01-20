require "../../../contexts/schedules"
require "../../errors"

class API::SchedulesController < AppController
  def index
    query = Query.new

    if event_id = query_params["event_id"]?
      query.where(event_id: event_id)
    end

    schedules = Schedules.list_schedules(query)

    render_json({
      schedules: schedules,
    })
  end

  def get
    query = Query.preload(:activities, Query.order_by("index"))
    schedule_id = url_params["schedule_id"]
    unless schedule = Schedules.get_schedule(schedule_id, query)
      return render_error_json(Errors::NotFound)
    end

    render_json({
      schedule: schedule,
    })
  end

  def create
    changeset = Schedules.create_schedule(json_params.as_h)

    unless changeset.valid?
      return render_error_json(Errors::Unprocessable)
    end

    render_json({
      schedule: changeset.instance,
    })
  end

  struct AddRunParams
    include JSON::Serializable

    property run_id : Int32
    property index : Int32?
  end

  def add_activity
    schedule_id = url_params["schedule_id"]
    params = structured_params(AddRunParams)

    unless schedule = Schedules.get_schedule(schedule_id)
      return render_error_json(Errors::NotFound)
    end

    unless run = Runs.get_run(params.run_id)
      return render_error_json(Errors::NotFound)
    end

    changeset = Schedules.create_activity({schedule_id: schedule.id, run_id: run.id})
    unless changeset.valid?
      return render_error_json(Errors::Unprocessable)
    end

    Schedules.add_activity(schedule, changeset.instance, params.index || 0)
    schedule = Schedules.get_schedule(schedule_id)
    render_json({
      schedule: schedule,
    })
  end

  struct UpdateActivityParams
    include JSON::Serializable

    property activity_id : Int32
    property changes : JSON::Any
  end

  def update_activity
    schedule_id = url_params["schedule_id"]
    params = structured_params(UpdateActivityParams)

    unless schedule = Schedules.get_schedule(schedule_id)
      return render_error_json(Errors::NotFound)
    end

    unless activity = Schedules.get_activity(params.activity_id)
      return render_error_json(Errors::NotFound)
    end

    changes = params.changes.as_h
    # Index will never be anything other than Int32, but crecto doesn't guarantee that.
    previous_index = activity.index.to_s.to_i32
    requested_index = changes["index"]?.try(&.as_i)
    changeset = Schedules.update_activity(activity, changes)

    unless changeset.valid?
      return render_error_json(Errors::Unprocessable)
    end

    if requested_index && requested_index != previous_index
      Schedules.move_activity(schedule, previous_index, requested_index)
    end

    schedule = Schedules.get_schedule(schedule_id)
    render_json({
      schedule: schedule,
    })
  end

  struct RemoveActivityParams
    include JSON::Serializable
    property activity_id : Int32
  end

  def remove_activity
    schedule_id = url_params["schedule_id"]
    params = structured_params(RemoveActivityParams)

    unless schedule = Schedules.get_schedule(schedule_id)
      return render_error_json(Errors::NotFound)
    end

    unless activity = Schedules.get_activity(params.activity_id)
      return render_error_json(Errors::NotFound)
    end

    Schedules.remove_activity(schedule, params.activity_id)

    schedule = Schedules.get_schedule(schedule_id)
    render_json({
      schedule: schedule,
    })
  end
end
