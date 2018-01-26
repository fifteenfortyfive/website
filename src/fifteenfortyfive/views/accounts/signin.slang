.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Sign in

      p.lead
        | Don't have an account yet?
        a(href="/accounts/new") Create one now!

      form.form(action="/accounts/signin?redirect=#{redirect_target}" method="POST")
        .form__field
          label.form__label.form__label--large Username
          input.form__input(name="username" required="true")

        .form__field
          label.form__label.form__label--large Password
          input.form__input(name="password" type="password" required="true")

        input.form__submit(type="submit" value="Signin")

