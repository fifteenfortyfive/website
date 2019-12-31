require "../../../contexts/schedules"
require "../../errors"

class API::SchedulesController < AppController
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
      return render_error_json(Errors::InternalServerError)
    end

    activities = Schedules.get_schedule_activities(schedule)
    activities = Schedules.add_activity(activities, changeset.instance, params.index)
    activities = Schedules.update_schedule_activities(schedule, activities)

    render_json({
      activities: activities,
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

    activities = Schedules.get_schedule_activities(schedule)
    activities = Schedules.remove_activity(activities, params.activity_id)
    activities = Schedules.update_schedule_activities(schedule, activities)

    render_json({
      activities: activities,
    })
  end
end