.container
  .row
    .col-sm-10
      .page-header
        h1 2018 Signups

      p.lead
        | This year's event will continue to feature the same games as last year: the Mario 602, the Rareware 301%, and the Sprashfecta.
        | Signups will be open until end-of-day UTC on
        strong March 1st, 2018.


  .row
    .col-sm-5
      h3 Runner Signup

      p Everyone is welcome to participate in this event! Don't worry about skill levels or how many games you can run. Teams will be balanced after signups have closed to ensure that every team has a fair chance during the event.

      - if runner_submission
        p You've submitted:
        ul
          - runner_submission.games.each do |game|
            - game_data = game["game"].as(Hash(String, JSON::Type))
            li
              strong= game_data["short_name"]
              | -
              strong= game_data["category"]
              | in
              strong= game["est"]

        a.form__button(href="/register/runner") Edit your Submission
        form(action="/register/runner/revoke" method="POST")
          input.form__button.form__button--danger(type="submit" value="Withdraw Submission")

      - else
        p You haven't submitted any games yet!

        a.form__button(href="/register/runner") Signup to Run


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
