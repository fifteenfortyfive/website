.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Edit Account


      form.form(action="/accounts/update" method="POST")
        .form__field
          label.form__label.form__label--large Username
          input.form__input(name="username" value=env.current_user.username required="true")

        .form__field
          label.form__label.form__label--large Password
          input.form__input(name="password" type="password" required="true")

        .form__field
          label.form__label.form__label--large Confirm
          input.form__input(name="confirm_password" type="password" required="true")

        .form__field
          label.form__label.form__label--large Discord
          input.form__input(name="discord" value=env.current_user.discord required="true")

        .form__field
          label.form__label.form__label--large Twitch
          span.form__leadin twitch.tv/
          input.form__input(name="twitch" value=env.current_user.twitch required="true")

        .form__field
          label.form__label.form__label--large Twitter
          span.form__leadin twitter.com/
          input.form__input(name="twitter" value=env.current_user.twitter )

        .form__field.signup__runner-info__timezone
          label.form__label.form__label--large Timezone
          input.form__input(name="timezone" value=env.current_user.timezone placeholder="UTC, EST, AEST")


        input.form__submit(type="submit")
