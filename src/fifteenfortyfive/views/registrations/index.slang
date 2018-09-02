.container
  .row
    .col-sm-10
      .page-header
        h1 2018 Signups

      - if env.feature_flags["open_signups"].enabled
        p.lead
          | This year's event will continue to feature the same games as last year: the Mario 602, the Rareware 301%, and the Sprashfecta.
          | Signups will be open until end-of-day UTC on
          strong March 1st, 2018.
      - else
        p.lead
          | This year's event will continue to feature the same games as last year: the Mario 602, the Rareware 301%, and the Sprashfecta.
          | Runner signups closed on March 1st, 2018, but
          strong commentator signups are still open!

      p.lead
        | If you haven't already, be sure to
        a(href=Constants::DISCORD_URL target="_blank") join our Discord server.
        | Runners and commentators will need to join to be part of the event, but everyone is welcome to join.


  .row
    .col-sm-5
      h3 Runner Signup

      - if env.feature_flags["open_signups"].enabled
        p Everyone is welcome to participate in this event! Don't worry about skill levels or how many games you can run. Teams will be balanced after signups have closed to ensure that every team has a fair chance during the event.

        - if runner_submission
          p You've submitted:
          ul
            - runner_submission.games.each do |game|
              - game_data = game["game"].as_h
              li
                strong= game_data["short_name"]
                | -
                strong= game_data["category"]
                | in
                strong= game["est"]

          - if runner_submission.captain
            p You are signed up to be a team captain.

          a.form__button(href="/register/runner") Edit your Submission
          form(action="/register/runner/revoke" method="POST")
            input.form__button.form__button--danger(type="submit" value="Withdraw Submission")

        - else
          p You haven't submitted any games yet!

          a.form__button(href="/register/runner") Signup to Run
      - else
        p Runner signups are now closed.

        - if runner_submission
          p You submitted:
          ul
            - runner_submission.games.each do |game|
              - game_data = game["game"].as_h
              li
                strong= game_data["short_name"]
                | -
                strong= game_data["category"]
                | in
                strong= game["est"]

          - if runner_submission.captain
            p You are signed up to be a team captain.

          p
            | If you need to edit your submission, please contact an organizer
            a(href=Constants::DISCORD_URL ) on Discord.
        - else
          p You are not signed up for any runs.

          p
            | If you are still interested in participating in the event, please contact an organizer
            a(href=Constants::DISCORD_URL ) on Discord.


    .col-sm-5
      h3 Commentator Signup

      p This year we'll be trying something new and having commentators on the stream to actively pick out and talk about interesting things happening during the event.

      - if commentator_submission
        p
          | You
          strong are
          | signed up to be a commentator.

        a.form__button(href="/register/commentator") Edit your Submission
        form(action="/register/commentator/revoke" method="POST")
          input.form__button.form__button--danger(type="submit" value="Withdraw Submission")

      - else
        p You are not currently signed up to be a commentator.

        a.form__button(href="/register/commentator") Signup to Commentate

  .vertical-space-u2

  .row
    .col-sm-10
      h3 Volunteering

      p
        | We may also have other volunteering opportunities beyond just commentating! During the event, we will likely need help managing social media, operating the stream layouts, etc. If you are interested in helping with either of these things, or have other ideas for ways to help out, please contact an event organizer directly
        a(href=Constants::DISCORD_URL ) on Discord.
