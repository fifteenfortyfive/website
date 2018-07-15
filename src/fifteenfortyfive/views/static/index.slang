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
        - case true
        - when env.feature_flags["open_signups"].enabled
          p.lead.banner
            | Signups for this year's 1545 are now open! They will close on
            strong March 1st, 2018.
            a(href="/accounts/new") Create an account
            | to get started, then
            a(href="/register") register for the event!

          p.lead.banner
            | So far,
            strong= runner_submissions.size
            | different runners have signed up for a total of
            strong= runner_submissions.reduce(0){ |sum, rs| sum += rs.games.size }
            | runs!
            strong= commentator_submissions.size
            | people have also registered for commentary during the event.
            a(href="/register") Sign up now to join them!
        - when env.feature_flags["teams"].enabled
          / p.lead.banner
          /   strong Teams for this year's 1545 have been announced!
          /   | Find out who's running what
          /   a(href="/teams") on the teams page!
          p.lead.banner
            strong This year's 1545 has ended!
            br
            | Check out the results
            a(href="https://www.speedrun.com/1545" target="_blank") on speedrun.com
            | and please
            a(href="https://goo.gl/forms/cuE0dzc2BljjzePn1" target="_blank") let us know what you thought of the event!

        - else
          p.lead.banner
            | Runner signups for this year's 1545 have closed! This year,
            strong= runner_submissions.size
            | runners submitted a total of
            strong= runner_submissions.reduce(0){ |sum, rs| sum += rs.games.size }
            | runs! Over the next two weeks, we'll be forming the teams and will announce them shortly afterwards.



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
