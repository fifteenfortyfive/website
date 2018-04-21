.container.scheduler(style="--color: ##{team.color}")
  .row
    .col-sm-4
      .page-header
        h1 Scheduling

      p Drag runs up and down in the grid to create the schedule for your team.

      p When creating your team's schedule, be sure to take into account each runner's availability, timezone, and consecutive running time. Talk to your team to get a feel for what will work best. If you run into scheduling conflicts, contact an organizer.

      p
        strong Times are displayed in UTC.

      .form__button.schedule-submit-button
        | Save Schedule

      .flash-container


    .col-sm-6
      .schedule-grid
        .schedule-grid__timeline
          /TODO: The race starts at 11pm UTC on the 14th and (should) end on the 17th.
            These numbers should be managed by an `event` record instead of hard coded.
          - race_start = Time.new(2018, 7, 13, 23, 0, 0)
          - 56.times do |hour|
            - entry_time = race_start + hour.hours
            - if entry_time.hour == 0
              .schedule-entry.timeline-entry.timeline-entry__date(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%m/%d")
            - else
              .schedule-entry.timeline-entry(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%l%p")


        .schedule-grid__entries
          - runs.each do |run|
            - seconds = Math.max(run.estimate_seconds || 0, 3600)
            .schedule-entry(class=run.game.series style="--schedule-entry-seconds: #{seconds}px" data-run-id=run.id )
              span.schedule-entry__name
                = run.game.name
                span.schedule-entry__runner-name
                  = run.runner.username
                  span.schedule-entry__runner-timezone= "(#{run.runner.timezone})"

script(src="/js/dragula.js")
script(src="/js/scheduler.js")
