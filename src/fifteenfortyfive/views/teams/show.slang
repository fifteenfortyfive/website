.container.team-show-page(style="--color: ##{team.color}")
  .row
    .col-sm-10
      .page-header.colored
        h1
          == team.name
          .pull-right
            - if user_can_edit?(env.current_user?, team)
              a.unstyled(href="/teams/#{team.slug}/edit")
                .fas.fa-pencil-alt


  .row
    .col-sm-4
      h3 Captain
      - if captain
        p== captain.username
      - else
        p This team does not have a captain.

      h3 Runners
      .account-box-grid
        - runs.map(&.runner).uniq.sort_by(&.username.not_nil!).each do |runner|
          .account-box.account-box--small(style="--color: ##{team.color}")
            - if runner.avatar_object_id
              img.account-box__avatar(src="#{Constants::ASSETS_URL}/#{runner.avatar_object_id}")
            - else
              img.account-box__avatar(src="#{Constants::ASSETS_URL}/default-avatar")

            .account-box__info
              span.account-box__username== runner.username

              - if (twitch_name = runner.twitch) && !twitch_name.empty?
                a.account-box__social(href="https://twitch.tv/#{twitch_name}" target="_blank" data-brand="twitch")
                  span.account-box__social__brand.fab.fa-twitch

              - if (twitter_name = runner.twitter) && !twitter_name.empty?
                a.account-box__social(href="https://twitter.com/#{twitter_name}" target="_blank" data-brand="twitter")
                  span.account-box__social__brand.fab.fa-twitter


    .col-sm-6
      h3 Runs

      - runs.each do |run|
        .run.run--block
          span.run__game-name= run.game.name
          span.run__runner-name= run.runner.username
