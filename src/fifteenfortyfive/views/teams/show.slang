.container.team-show-page(style="--color: ##{team.color}")
  .row
    .col-sm-10
      .page-header.colored
        h1
          == team.name
          .pull-right
            - if user_can_edit?(env.current_user?, team)
              a.page-header__action.unstyled(href="/teams/#{team.slug}/edit")
                .fas.fa-pencil-alt
              a.page-header__action.unstyled(href="/teams/#{team.slug}/schedule")
                .far.fa-clock


  .row
    .col-sm-4
      h3 Captain
      - if captain
        .account-box.account-box--small(style="--color: ##{team.color}")
          - if captain.avatar_object_id
            img.account-box__avatar(src="#{Constants::ASSETS_URL}/#{captain.avatar_object_id}")
          - else
            img.account-box__avatar(src="#{Constants::ASSETS_URL}/default-avatar")

          .account-box__info
            span.account-box__username
              == captain.username
              span.account-box__stream-status.stream-indicator(data-account-id=captain.id )

            - if (twitch_name = captain.twitch) && !twitch_name.empty?
              a.account-box__social(href="https://twitch.tv/#{twitch_name}" target="_blank" data-brand="twitch")
                span.account-box__social__brand.fab.fa-twitch

            - if (twitter_name = captain.twitter) && !twitter_name.empty?
              a.account-box__social(href="https://twitter.com/#{twitter_name}" target="_blank" data-brand="twitter")
                span.account-box__social__brand.fab.fa-twitter
      - else
        p This team does not have a captain.

      h3 Runners
      .account-box-grid
        - runs.map(&.runner).uniq.sort_by(&.username.not_nil!).each do |runner|
          - next if runner.id == (captain && captain.id)
          .account-box.account-box--small(style="--color: ##{team.color}")
            - if runner.avatar_object_id
              img.account-box__avatar(src="#{Constants::ASSETS_URL}/#{runner.avatar_object_id}")
            - else
              img.account-box__avatar(src="#{Constants::ASSETS_URL}/default-avatar")

            .account-box__info
              span.account-box__username
                == runner.username
                span.account-box__stream-status.stream-indicator(data-account-id=runner.id )

              - if (twitch_name = runner.twitch) && !twitch_name.empty?
                a.account-box__social(href="https://twitch.tv/#{twitch_name}" target="_blank" data-brand="twitch")
                  span.account-box__social__brand.fab.fa-twitch

              - if (twitter_name = runner.twitter) && !twitter_name.empty?
                a.account-box__social(href="https://twitter.com/#{twitter_name}" target="_blank" data-brand="twitter")
                  span.account-box__social__brand.fab.fa-twitter


    .col-sm-6
      h3 Schedule

      p
        small
          em Schedules are subject to change until 1 week before the event. All times are shown in UTC.

      /TODO: The race starts at 11pm UTC on the 14th and (should) end on the 17th.
        These numbers should be managed by an `event` record instead of hard coded.
      - race_start = Time.new(2018, 7, 13, 23, 0, 0)
      .schedule-grid
        .schedule-grid__timeline
          - total_hours = runs.reduce(Time::Span.zero){ |acc, run| acc += run.estimate_time || 2.hours }.total_hours.to_i + 1
          - total_hours.times do |hour|
            - entry_time = race_start + hour.hours
            - if entry_time.hour == 0
              .schedule-entry.timeline-entry.timeline-entry__date(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%m/%d")
            - else
              .schedule-entry.timeline-entry(style="--schedule-entry-seconds: 3600px")
                span.timeline-entry__time= entry_time.to_s("%l%p")


        .schedule-grid__entries
          - runs.each do |run|
            - has_actual_time = !!run.actual_time_seconds
            - time = run.estimate_seconds
            - seconds = Math.max(time || 0, 3600)
            .schedule-entry(class=run.game.series style="--schedule-entry-seconds: #{seconds}px" data-is-actual=has_actual_time data-run-id=run.id )
              .schedule-entry__name
                strong= run.game.name
                | by
                span.schedule-entry__runner-name
                  = run.runner.username
                  .schedule-grid__entries


