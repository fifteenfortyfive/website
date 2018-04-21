.container
  .row
    .col-sm-10
      .page-header
        h1 2018 Teams

      p.lead
        | This year's event features
        = runs.uniq{ |r| r.runner }.size
        | runners racing in
        = teams.size
        | different teams.

      p
        | Teams are specifically created for a balanced race, with every team having a competitive estimate and a fair chance at winning the race. The average estimate for every team is 53 hours and 7 minutes, with the standard deviation between them sitting just under 4 minutes.

      p
        | Teams are responsible for creating their own run schedules. These schedules will be finalized and posted roughly a week before the event.

      .teams-display
        - runs_by_team.each do |team, runs|
          .team(style="--color: ##{team.color}")
            .team__header
              a.no-color(href="/teams/#{team.slug}")
                span.team__name== team.name
              span.team__captain== team.captain.try(&.username)

            .team__runs
              - runs.sort_by(&.runner.username.not_nil!.downcase).group_by(&.runner).each do |runner, runs|
                - is_captain = team.captain_id == runner.id
                .runner(data-captain=is_captain )
                  span.runner__name
                    == runner.username
                    - if runner.twitch && !runner.twitch.not_nil!.empty?
                      a.runner__link(href="https://twitch.tv/#{runner.twitch}" target="_blank" data-brand="twitch")
                        span.fab.fa-twitch
                    - if runner.twitter && !runner.twitter.not_nil!.empty?
                      a.runner__link(href="https://twitter.com/#{runner.twitter}" target="_blank" data-brand="twitter")
                        span.fab.fa-twitter

                  span.runner__runs= runs.map(&.game.name).join(", ")

  / .row
  /   .schedule-grid
  /     .schedule-grid__timeline
  /       /TODO: The race starts at 11pm UTC on the 14th and (should) end on the 17th.
  /         These numbers should be managed by an `event` record instead of hard coded.
  /       - race_start = Time.new(2018, 7, 13, 23, 0, 0)
  /       - 56.times do |hour|
  /         - entry_time = race_start + hour.hours
  /         - if entry_time.hour == 0
  /           .schedule-entry.timeline-entry.timeline-entry__date(style="--schedule-entry-seconds: 3600px")
  /             span.timeline-entry__time= entry_time.to_s("%m/%d")
  /         - else
  /           .schedule-entry.timeline-entry(style="--schedule-entry-seconds: 3600px")
  /             span.timeline-entry__time= entry_time.to_s("%l%p")


  /     - runs_by_team.each do |team, runs|
  /       .schedule-grid__entries
  /         - runs.each do |run|
  /           - seconds = Math.max(run.estimate_seconds || 0, 3600)
  /           .schedule-entry(class=run.game.series style="--schedule-entry-seconds: #{seconds}px" data-run-id=run.id )
  /             span.schedule-entry__name
  /               = run.game.name
  /               span.schedule-entry__runner-name
  /                 = run.runner.username
