.titlebar
  .container
    .row
      .col-sm-6
        h1 The 1545


      .col-sm-4.right
        p.lead
          | July 13th - 16th at
          a(href="https://twitch.tv/1545race") twitch.tv/1545race


.statbar
  .container
    .row
      .stats.col-sm-10
        .stat
          span.fa.fa-clock
          | 3 days
        .stat
          span.fa.fa-gamepad
          | 13 games


.container
  .row
    .col-sm-10
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
        | runs! We've also had
        strong= commentator_submissions.size
        | people signup for commentary during the event.
        a(href="/register") Sign up now to join them!

      .page-header
        h1 The Relay

      p.lead The 1545 is a massive speedrunning relay race where teams of runners will complete all of the games in the Super Mario 602, the Rareware 301%, and the Sprashfecta, all over the course of 3 days.

      p The 1545 is one of the largest single races in speedrunning, with an estimated 330 hours of gameplay time. For reference, a week-long marathon generally has about 150-160 hours of gameplay time.

      p Each team is expected to take just over 50 hours to complete the full-completion categories of all 13 games sequentially.

      p
        | The 1545 will take place starting on
        span#race_start_date July 13th, 2018 at 11pm UTC
        | at
        a(href="https://twitch.tv/1545race") twitch.tv/1545race
        | and will run through the 16th, until the last team has finished.


script(src="/js/moment.min.js")
script(src="/js/moment-timezone.min.js")


javascript:
  // Name of the time zone that the user is currently in.
  var user_time_zone    = moment.tz.guess();
  // July 14th, 2017 at 9pm UTC
  var global_start_time = moment("2018-07-13T23:00:00Z");
  // Start time, converted to the local time zone.
  var local_start_time  = moment(global_start_time).tz(user_time_zone);


  document.querySelector("#race_start_date").innerHTML = local_start_time.format("MMMM Do, YYYY [at] h:mma z");
