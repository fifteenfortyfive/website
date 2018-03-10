.container
  .row
    .col-sm-10
      .page-header
        h1 2018 Teams


      .teams-display
        - runs_by_team.each do |team, runs|
          .team(style="--color: ##{team.color}")
            .team__header
              span.team__name= team.name
              span.team__captain= team.captain.try(&.username)

            .team__runs
              - runs.sort_by(&.runner.username.not_nil!).group_by(&.runner).each do |runner, runs|
                - is_captain = team.captain_id == runner.id
                .runner(data-captain=is_captain )
                  span.runner__name= runner.username
                  span.runner__runs= runs.map(&.game.name).join(", ")
