h3 All Schedules

.schedule-grid
  .schedule-grid__timeline
    /TODO: The race starts at 11pm UTC on the 14th and (should) end on the 17th.
      These numbers should be managed by an `event` record instead of hard coded.
    - race_start = Time.new(2018, 7, 13, 23, 0, 0)
    - total_hours = 58
    - total_hours.times do |hour|
      - entry_time = race_start + hour.hours
      - if entry_time.hour == 0
        .schedule-entry.timeline-entry.timeline-entry__date(style="--schedule-entry-seconds: 3600px")
          span.timeline-entry__time= entry_time.to_s("%m/%d")
      - else
        .schedule-entry.timeline-entry(style="--schedule-entry-seconds: 3600px")
          span.timeline-entry__time= entry_time.to_s("%l%p")

  - runs_by_team.each do |team, runs|
    .schedule-grid__entries
      - runs.each do |run|
        - seconds = Math.max(run.estimate_seconds || 0, 3600)
        .schedule-entry(class=run.game.series style="--schedule-entry-seconds: #{seconds}px" data-run-id=run.id )
          .schedule-entry__name
            strong= run.game.name
            | by
            span.schedule-entry__runner-name
              = run.runner.username
