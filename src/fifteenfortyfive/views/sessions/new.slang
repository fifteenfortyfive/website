.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Sign in

      p.lead
        | Don't have an account yet?
        a(href="/accounts/new") Create one now!

      form.form(action="/signin?redirect=#{redirect_target}" method="POST")
        .form__field
          label.form__label.form__label--large Username
          input.form__input(name="username" required="true")

        .form__field
          label.form__label.form__label--large Password
          input.form__input(name="password" type="password" required="true")

        p
          | Forget your password? Contact an event organizer
          a(href=Constants::DISCORD_URL target="_blank") on Discord
          | to have your password reset manually.

        input.form__submit(type="submit" value="Signin")
