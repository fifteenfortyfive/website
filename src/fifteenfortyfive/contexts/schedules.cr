require "crecto"

require "./schedules/**"

module Schedules
  extend self

  ###
  # Schedules
  ###

  SCHEDULE_PRELOADS = [:activities]

  def list_schedules(query : Query = Query.new)
    Repo.all(Schedule, query)
  end

  def get_schedule(schedule_id, query : Query = Query.new)
    Repo.all(Schedule, query.preload(SCHEDULE_PRELOADS).where(id: schedule_id.to_s).limit(1)).first?
  end

  def get_schedule!(schedule_id, query : Query = Query.new)
    Repo.all(Schedule, query.preload(SCHEDULE_PRELOADS).where(id: schedule_id.to_s).limit(1)).first
  end

  def get_event_schedule(event_id)
    matches = list_schedules(Query.where(event_id: event_id).preload(SCHEDULE_PRELOADS))
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

  def get_schedule_activities(schedule : Schedule)
    query = Query.order_by("index")
    schedule.activities? || Repo.get_association(schedule, :activities, query).as(Array(Activity))
  end

  def update_schedule_activities(schedule : Schedule, activities : Array(Activity))
    updated_activities = [] of Activity

    Repo.transaction! do
      Repo.delete_all(Activity, Query.where(schedule_id: schedule.id))

      activities.each_with_index do |activity, index|
        changeset = create_activity({index: index, schedule_id: schedule.id}, activity)

        unless changeset.valid?
          raise "couldn't create an activity: #{activity.id}"
        end

        updated_activities << changeset.instance
      end
    end

    updated_activities
  end

  # Adds _or moves_ an activity on the schedule. Activities may only appear
  # once, so if the activity is already on the schedule, it is first removed,
  # then re-added to the list.
  def add_activity(activities : Array(Activity), new_activity : Activity, position : Int32? = nil)
    position = position ? position.clamp(0, activities.size - 1) : activities.size - 1

    activities = activities.reduce([] of Activity?) do |acc, activity|
      # If the requested index is after the current index, removing the entry
      # will shift everything left by one, so the requested index needs to be
      # decremented as well.
      if activity.is_same(new_activity)
        puts "found same activity, removing"
        next acc << nil
      end

      acc << activity
    end

    activities.insert(position, new_activity).compact
  end

  def remove_activity(activities : Array(Activity), activity_id : Int32)
    deleted, activities = activities.partition { |a| a.id == activity_id }

    activities
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
    changeset = activity.cast(changes)
    Repo.update(changeset)
  end

  def delete_activity(activity : Activity)
    Repo.delete(activity)
  end
end
