require "crecto"

require "./schedules/**"

module Schedules
  extend self

  ###
  # Schedules
  ###

  def schedule_preload_query(q : Query = Query.new)
    q.preload(:activities, Query.order_by("index ASC"))
  end

  def list_schedules(query : Query = Query.new)
    Repo.all(Schedule, schedule_preload_query(query))
  end

  def get_schedule(schedule_id, query : Query = Query.new)
    Repo.all(Schedule, schedule_preload_query(query).where(id: schedule_id.to_s).limit(1)).first?
  end

  def get_schedule!(schedule_id, query : Query = Query.new)
    Repo.all(Schedule, schedule_preload_query(query).where(id: schedule_id.to_s).limit(1)).first
  end

  def get_event_schedule(event_id)
    matches = list_schedules(schedule_preload_query.where(event_id: event_id))
    matches.first? || create_schedule({event_id: event_id}).instance
  end

  def new_schedule
    Schedule.new
  end

  def create_schedule(schedule : Schedule)
    Repo.insert(schedule)
  end

  def create_schedule(attrs)
    schedule = new_schedule
    schedule = schedule.cast(attrs)
    Repo.insert(schedule)
  end

  def update_schedule(schedule : Schedule, changes)
    changeset = schedule.cast(changes)
    Repo.update(changeset)
  end

  def delete_schedule(schedule : Schedule)
    Repo.delete(schedule)
  end

  def get_schedule_activities(schedule : Schedule, stale_ok = true)
    query = Query.order_by("index")
    existing = stale_ok ? schedule.activities? : nil
    existing || Repo.get_association(schedule, :activities, query).as(Array(Activity))
  end

  def move_activity(schedule : Schedule, previous_index : Int32, new_index : Int32)
    activities = get_schedule_activities(schedule)
    new_index = new_index.clamp(0, activities.size - 1)
    # Query taken from https://medium.com/@dnasleakim/nice-post-i-think-the-update-can-be-optimized-to-be-a-single-statement-and-only-affect-the-rows-92be7ad5baa8
    # Given an existing index (old) and a target index (new), update every
    # activity between them, shifting each one forward or backward to make room
    # for the activity at the target index.
    # Yes, this interpolates values directly into SQL. They are typed as Int32s,
    # so this should be reasonably safe. I still don't like it, but crystal-db
    # isn't casting properly.
    query = %Q(
      WITH
        old_index as (SELECT #{previous_index} as x),
        new_index as (SELECT #{new_index} as x),
        old_and_new as (SELECT x FROM new_index UNION SELECT x FROM old_index),
        min as (SELECT min(x) as x FROM old_and_new),
        max as (SELECT max(x) as x FROM old_and_new)
      UPDATE "public"."sched_activities"
        SET index = (
          CASE
          WHEN index >= (SELECT x FROM new_index) AND index < (SELECT x FROM old_index) THEN index + 1
          WHEN index > (SELECT x FROM old_index) AND index <= (SELECT x FROM new_index) THEN index - 1
          WHEN index = (SELECT x FROM old_index) THEN (SELECT x FROM new_index)
          ELSE index
          END
        )
        WHERE index >= (SELECT x FROM min) AND index <= (SELECT x FROM max) AND schedule_id = $1;
    )

    Repo.raw_query(query, [schedule.id])
    get_schedule_activities(schedule, stale_ok: false)
  end

  # Adds an activity on the schedule. `new_activity` must already exist in the
  # database for this function to work.
  def add_activity(schedule : Schedule, new_activity : Activity, given_position : Int32)
    activities = get_schedule_activities(schedule)
    position = given_position.clamp(0, activities.size - 1)

    Repo.transaction! do
      query = <<-SQL
        UPDATE "public"."sched_activities" SET index = index + 1 WHERE index >= $1 AND schedule_id = $2;
      SQL

      Repo.raw_exec(query, position, schedule.id)
      update_activity(new_activity, {index: position})
    end

    get_schedule_activities(schedule, stale_ok: false)
  end

  def remove_activity(schedule : Schedule, activity_id : Int32)
    Repo.transaction! do
      activities = get_schedule_activities(schedule)
      deleted = activities.find { |a| a.id == activity_id }
      break unless deleted

      delete_activity(deleted)

      query = <<-SQL
        UPDATE "public"."sched_activities" SET index = index - 1 WHERE index >= $1 AND schedule_id = $2;
      SQL
      Repo.raw_exec(query, deleted.index, schedule.id)
    end

    get_schedule_activities(schedule, stale_ok: false)
  end

  ###
  # Activities
  ###

  def get_activity(activity_id, query : Query = Query.new)
    Repo.all(Activity, query.where(id: activity_id.to_s).limit(1)).first?
  end

  def get_activity!(activity_id, query : Query = Query.new)
    Repo.all(Activity, query.where(id: activity_id.to_s).limit(1)).first
  end

  def new_activity
    Activity.new
  end

  def create_activity(activity : Activity)
    Repo.insert(activity)
  end

  def create_activity(attrs, initial : Activity = new_activity())
    changeset = initial.cast(attrs)
    Repo.insert(changeset)
  end

  def update_activity(activity : Activity, changes)
    # As a safety measure, ensure `index` is not updated by this cast. Moves
    # must be made explicitly to avoid conflicts with other updates, since in
    # most cases multiple activities have to be updated.
    changes = changes.to_h
    changes.delete("index")
    changeset = activity.cast(changes)
    Repo.update(changeset)
  end

  def delete_activity(activity : Activity)
    Repo.delete(activity)
  end
end
