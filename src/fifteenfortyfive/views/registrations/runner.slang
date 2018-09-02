.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Runner Registration

      h3 Game Submissions

      p Let us know which games you'd like to run for the event. Drag the cards to re-order the games by your preference in running them, with your most preferred game at the top of the list.

      p
        strong A note on estimates:
        | We're not looking for "worst-case" estimates like most marathons. Instead, we'd like a time that represents an average resetless run. The best way to determine this is to do a few resetless runs and take the average of the times. Feel free to round up or down based a bit on how you felt those runs went.

      p You'll also be able to update your PBs and estimates after your initial submission, so don't worry about planning for improvement.

      p
        em Only submit games that you will be willing to run. While you may not end up running all of the games you submit, we cannot guarantee which runs you will end up with.

      .signup__selected-games
        .signup__game.signup__game--blank
          .signup__game__boxart.handle
          .signup__game__content
            .signup__game__header
              .signup__game__name
              .signup__game__category
              .signup__game__button
                span.fas.fa-times
            .form__field.signup__game__pb
              label.form__label PB
              input.form__input(placeholder="00:00:00")
            .form__field.signup__game__estimate
              label.form__label EST
              input.form__input(placeholder="00:00:00")

        - submission.try &.games.each do |game|
          - game_data = game["game"].as_h
          .signup__game
            .signup__game__boxart.handle
              img(src="/res/#{game_data["id"]}.jpg")
            .signup__game__content
              .signup__game__header
                .signup__game__name= game_data["short_name"]
                .signup__game__category= game_data["category"]
                .signup__game__button
                  span.fas.fa-times
              .form__field.signup__game__pb
                label.form__label PB
                input.form__input(value="#{game["pb"]}" placeholder="00:00:00")
              .form__field.signup__game__estimate
                label.form__label EST
                input.form__input(value="#{game["est"]}" placeholder="00:00:00")

      .signup__find-game
        input.signup__find-game__input(placeholder="Game name...")
        a.signup__find-game__add-button Add Game

      .vertical-space-u2

      p If you have any limitations on how many games you are willing to run, or how much time you are willing to spend on runs during the event, use these fields to let us know. If you are okay with running all of the games you submitted, or have no time limits, leave these fields blank.

      .form__field.signup__limits__games
        label.form__label.form__label--large Max games
        input.form__input(value=submission.try(&.max_games) placeholder="3")

      .form__field.signup__limits__time
        label.form__label.form__label--large Max time
        input.form__input(value=submission.try(&.max_time) placeholder="00:00:00")


      h3 Team Requests

      p If there are any runners you would specifically like to be teamed with, list their names in the "Pair" field. If you would specifically like to avoid being teamed with, list their names in the "Avoid" field.

        em This information will be kept private. Only event organizers will see your submissions.

      .form__field.signup__team-requests__pair
        label.form__label.form__label--large Team with
        input.form__input(value=submission.try(&.pair) placeholder="SHM, HolySanctum")

      .form__field.signup__team-requests__avoid
        label.form__label.form__label--large Avoid
        input.form__input(value=submission.try(&.avoid) placeholder="Someone random, i don't know")

      h3 Captains

      p Team captains are the point-of-contact for the team, and are in charge of creating the schedule and making sure the runners on their team are ready to go during the event.

      .form__field.form__field--checkbox.signup__captain
        label.form__label.form__label--checkbox
          - if submission && submission.captain
            input.form__input(type="checkbox" checked="true")
          - else
            input.form__input(type="checkbox")
          | I am willing to be a team captain.


      h3 Submission

      p If you are happy with all of the information you've entered above. Go ahead and hit the submit button!

      p Don't worry if you aren't 100% confident about your submission, you'll be able to edit this information any time after submitting.

      - if submission
        input(type="hidden" id="submission_id" value=submission.id )
      a.form__submit Submit


script src="/js/horsey.js"
script src="/js/dragula.js"
script src="/js/signup.js"
