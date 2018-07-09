.container.runner-dashboard
  .row
    .col-sm-10
      .page-header
        h1
          | Runner Dashboard
          small
            | for
            == env.current_user.username

      em It is always safe to refresh this page. If you have any issues, please contact an organizer in Discord as soon as possible.

  .row
    .col-sm-4
      h3 Statuses

      span.status-indicator.status--server_connection
        | Server connection:
        span.status-indicator__text
        span.status-indicator__help
          | If this indicator is "Alive", then this page is connected to the 1545 servers and can send and receive updates in real time. If it is "Dead", you will need to refresh the page to reconnect.

      span.status-indicator.status--stream_status
        | Twitch:
        span.status-indicator__text

        span.status-indicator__help
          | If this indicator is "Live", then we have verified that you are currently live on Twitch. If it is "Offline", then we have not been able to verify your status. This generally takes less than 2 minutes to update.

      span.status-indicator.status--on_stream
        | On stream:
        span.status-indicator__text
        span.status-indicator__help
          | If this indicator is "On-air", then you are currently on display on the main 1545 stream.


    .col-sm-6
      h3 Runs

      - runs.each do |run|
        .run(data-run-id=run.id )
          .run__game== run.game.name

          .run__info
            .run__timer-actions
              .run__button.run__timer-start
                span.fa.fa-play-circle
                | Start
              .run__button.run__timer-resume
                span.fa.fa-play-circle
                | Resume
              .run__button.run__timer-finish
                span.fa.fa-flag-checkered
                | Finish
              .run__button.run__timer-reset
                span.fa.fa-undo-alt
                | Reset

            .run__timer-container
              span.run__timer 00:00:00
              span.run__timer-state ready


      h3 Schedule

      em.text-muted This schedule does not have live updates. To get the most recent updates, refresh the page. It is always safe to refresh.

      .schedule-grid
        .schedule-grid__timeline
          /TODO: The race starts at 11pm UTC on the 14th and (should) end on the 17th.
            These numbers should be managed by an `event` record instead of hard coded.
          - race_start = Time.new(2018, 7, 13, 23, 0, 0)
          - 54.times do |hour|
            - entry_time = race_start + hour.hours
            - if entry_time.hour == 0
              .schedule-entry.timeline-entry.timeline-entry__date(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%m/%d")
            - else
              .schedule-entry.timeline-entry(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%l%p")


        .schedule-grid__entries
          - team_runs.each do |run|
            - has_actual_time = !!run.actual_time_seconds
            - time = run.actual_time_seconds || run.estimate_seconds
            - seconds = Math.max(time || 0, 3600)
            .schedule-entry(class=run.game.series style="--schedule-entry-seconds: #{seconds}px" data-is-actual=has_actual_time data-run-id=run.id )
              span.schedule-entry__name
                = run.game.name
                span.schedule-entry__runner-name
                  = run.runner.username



script(src="/js/moment.min.js")
script(src="/js/moment-duration-format.js")
script(src="/js/timers.js")
script(src="/js/runner-dashboard.js")
