.titlebar
  .container
    h1 The 1545

    .links
      a.link(href=Constants::DISCORD_URL target="_blank") Discord
      a.link(href=Constants::TWITCH_URL target="_blank") Twitch
      a.link(href=Constants::TWITTER_URL target="_blank") Twitter
      a.link(href=Constants::SRCOM_URL target="_blank") speedrun.com


.statbar
  .container
    .row
      .col-sm-10
        p.lead.banner
          strong We're looking for volunteers!
          br
          | If you'd like to lend a hand in future 1545 events, check out the
          a(href="/volunteer") volunteer page
          | or email us directly at
          a(href="mailto:volunteer@fifteenfortyfive.org") volunteer@fifteenfortyfive.org!



.container
  .row
    .col-sm-10
      .page-header
        h1 The Relay

      p.lead The 1545 is a massive speedrunning relay race where teams of runners will complete all of the games in the Super Mario 602, the Rareware 301%, and the Sprashfecta, all over the course of 3 days.

      p The 1545 is one of the largest single races in speedrunning, with an estimated 330 hours of gameplay time. For reference, a week-long marathon generally has about 150-160 hours of gameplay time.

      p Each team is expected to take just over 50 hours to complete the full-completion categories of all 13 games sequentially.

      / p
      /   | The 1545 will take place starting on
      /   strong#race_start_date July 13th, 2018 at 11pm UTC
      /   | at
      /   a(href="https://twitch.tv/1545race") twitch.tv/1545race
      /   | and will run through the 17th, until the last team has finished.
      p
        strong The next 1545 will take place in the summer of 2019. We hope to see you there!


  - unless live_streams.empty?
    .row
      .col-sm-10
        .page-header
          h1 Live Runners

        .stream-grid
          - live_streams.each do |at, stream|
            - runner, team = at.account, at.team
            - game = games[stream.game_id]?
            - next unless game
            .stream(style="--color: ##{team.color};")
              .stream__header
                - if runner.avatar_object_id
                  img.stream__avatar(src="#{Constants::ASSETS_URL}/#{runner.avatar_object_id}")
                - else
                  img.stream__avatar(src="#{Constants::ASSETS_URL}/default-avatar")
                .stream__info
                  span.stream__runner= runner.username
                  span.stream__game= game.name
                  span.stream__title= stream.title
              a(href=TwitchService.stream_link(runner.twitch) target="_blank")
                img.stream__thumbnail(src=stream.thumbnail_url )


script(src="/js/moment.min.js")
script(src="/js/moment-timezone.min.js")
script(src="/js/stream-displays.js")

javascript:
  // Name of the time zone that the user is currently in.
  var user_time_zone    = moment.tz.guess();
  // July 14th, 2017 at 9pm UTC
  var global_start_time = moment("2018-07-13T23:00:00Z");
  // Start time, converted to the local time zone.
  var local_start_time  = moment(global_start_time).tz(user_time_zone);


  document.querySelector("#race_start_date").innerHTML = local_start_time.format("MMMM Do, YYYY [at] h:mma z");
