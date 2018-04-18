.container.scheduler(style="--color: ##{team.color}")
  .row
    .page-header
      h1 Scheduling

    p Drag runs up and down in the grid to create the schedule for your team.

    p When creating your team's schedule, be sure to take into account each runner's availability, timezone, and consecutive running time. Talk to your team to get a feel for what will work best. If you run into scheduling conflicts, contact an organizer.

    .schedule-grid.col-sm-6.col-sm-push-2
      - runs.each do |run|
        .schedule-entry(class=run.game.series )
          span.schedule-entry__runner-name
            = run.runner.username
            span.schedule-entry__runner-timezone= "(#{run.runner.timezone})"
          span.schedule-entry__game-name= run.game.name
          span.schedule-entry__estimate= run.estimate_time


script(src="/js/dragula.js")
script(src="/js/scheduler.js")
