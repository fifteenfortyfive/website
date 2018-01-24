.container
  .row
    .col-sm-10
      .page-header
        h1 Signup!

      p Use the form below to sign up for the 1545! Select your games from the column on the right, then add your PB and estimate for each one.

      p
        strong Note on estimates:
        | The 1545 is not like a normal speedrunning marathon. We aren't interested in your worst-case estimate. The best way to get a good estimate for us is to do 3-5 runs of your game and take the average time you get. While this may not be entirely accurate, it gives us a good idea of consistency relative to your PB.


  .row
    .form
      h3 Runner Info

      p We'll display your names here on the 1545 site and on the stat stream so people can find you. If you've provided your Twitter name, we'll tag you in a posts relating to your runs during the event.

      p Discord is required for participation in the event. If you do not wish to give your Twitch or Twitter name, leave the field blank.


      .form__field.signup__runner-info__discord
        label.form__label.form__label--large Discord
        input.form__input(placeholder="faulty#0000")

      .form__field.signup__runner-info__twitch
        label.form__label.form__label--large Twitch
        input.form__input(placeholder="amfaulty")

      .form__field.signup__runner-info__twitter
        label.form__label.form__label--large Twitter
        input.form__input(placeholder="@amfaulty")

      p
        We'd also like to know what timezone you're in to help when creating teams. Ideally, teams will include people from multiple timezones to avoid "graveyard shifts".

      .form__field.signup__runner-info__timezone
        label.form__label.form__label--large Timezone
        input.form__input(placeholder="America/New York")

      h3 Team Requests

      p
        If there are any runners you would specifically like to be teamed with, list their names in the "Pair" field. If you would specifically like to avoid being teamed with, list their names in the "Avoid" field.

        em This information will be kept private. Only event organizers will see your submissions.

      .form__field.signup__team-requests__pair
        label.form__label.form__label--large Team with
        input.form__input(placeholder="SHM, HolySanctum")

      .form__field.signup__team-requests__avoid
        label.form__label.form__label--large Avoid
        input.form__input(placeholder="Someone random, i don't know")

      h3 Game Submissions

      p Let us know which games you'd like to run for the event. Drag the cards to re-order the games by your preference in running them, with your most preferred game at the top of the list.

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

      .signup__find-game
        input.signup__find-game__input(placeholder="Game name...")
        a.signup__find-game__add-button Add Game

      .vertical-space-u2

      p If you have any limitations on how many games you are willing to run, or how much time you are willing to spend on runs during the event, use these fields to let us know.

      p If you are okay with running all of the games you submitted, or have no time limits, leave these fields blank.

      .form__field.signup__limits__games
        label.form__label.form__label--large Max games
        input.form__input(placeholder="3")

      .form__field.signup__limits__time
        label.form__label.form__label--large Max time
        input.form__input(placeholder="00:00:00")

      h3 Submission

      p If you are happy with all of the information you've entered above. Go ahead and hit the submit button!

      p Don't worry if you aren't 100% confident about your times or the games you are submitting, you'll be able to edit them after submitting.

      a.form__submit Submit


script src="js/horsey.js"
script src="js/dragula.js"
script src="js/signup.js"
