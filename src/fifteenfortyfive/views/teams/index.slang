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
                    span.account-box__stream-status.stream-indicator(data-account-id=runner.id )
                    - if runner.twitch && !runner.twitch.not_nil!.empty?
                      a.runner__link(href="https://twitch.tv/#{runner.twitch}" target="_blank" data-brand="twitch")
                        span.fab.fa-twitch
                    - if runner.twitter && !runner.twitter.not_nil!.empty?
                      a.runner__link(href="https://twitter.com/#{runner.twitter}" target="_blank" data-brand="twitter")
                        span.fab.fa-twitter

                  span.runner__runs= runs.map(&.game.name).join(", ")
