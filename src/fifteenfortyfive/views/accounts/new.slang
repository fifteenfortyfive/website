.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Create an Account


      h3 Account Setup

      form.form(action="/accounts/create" method="POST")
        p Starting with this event, we'll be creating profiles for runners, volunteers, and other users. These profiles will only be used to track your submissions and runs, and to create a profile page to display during the event. You'll also be able to log in and edit your information (including submissions, PBs, and estimates) later on.

        p More features may become available later, but these will all be opt-in.

        p Since this is the first event where we're doing this, everyone will need to sign up for a new account.

        .form__field
          label.form__label.form__label--large Username
          input.form__input(name="username" required="true")

        .form__field
          label.form__label.form__label--large Password
          input.form__input(name="password" type="password" required="true")

        .form__field
          label.form__label.form__label--large Confirm
          input.form__input(name="confirm_password" type="password" required="true")


        p We also need to know your name on Discord and Twitch. We'll use your Twitch name to load your feed on the official stream, and Discord will be our primary means of contact.

        p Your Twitter name is optional. If you choose to provide it, we'll use it to tag you in announcements about your runs during the event.

        .form__field
          label.form__label.form__label--large Discord
          input.form__input(name="discord" required="true")

        .form__field
          label.form__label.form__label--large Twitch
          span.form__leadin twitch.tv/
          input.form__input(name="twitch" required="true")

        .form__field
          label.form__label.form__label--large Twitter
          span.form__leadin twitter.com/
          input.form__input(name="twitter")


        p We'd also like to know what timezone you're in to help when creating teams. Ideally, teams will include people from multiple timezones to avoid "graveyard shifts".

        .form__field.signup__runner-info__timezone
          label.form__label.form__label--large Timezone
          input.form__input(name="timezone" placeholder="UTC, EST, AEST")


        input.form__submit(type="submit")
