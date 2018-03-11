.container.team-show-page(style="--color: ##{team.color}")
  .row
    .col-sm-10
      .page-header.colored
        h1= team.name

  .row
    .col-sm-4
      h3 Captain
      - if captain
        p= captain.username
      - else
        p This team does not have a captain.

      h3 Runners
      ul.runner-list
        - runs.map(&.runner).uniq.sort_by(&.username.not_nil!).each do |runner|
          li.runner
            = runner.username
            - if runner.twitch && !runner.twitch.not_nil!.empty?
              span.text-muted
                a.runner__link.unstyled(href="https://twitch.tv/#{runner.twitch}" target="_blank" data-brand="twitch")
                  span.fab.fa-twitch
            - if runner.twitter && !runner.twitter.not_nil!.empty?
              span.text-muted
                a.runner__link.unstyled(href="https://twitter.com/#{runner.twitter}" target="_blank" data-brand="twitter")
                  span.fab.fa-twitter


    .col-sm-6
      h3 Runs

      - runs.each do |run|
        .run.run--block
          span.run__game-name= run.game.name
          span.run__runner-name= run.runner.username
