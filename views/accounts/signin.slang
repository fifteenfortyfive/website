.container
  .row
    .col-sm-10
      .page-header
        h1 Signin

    form.form(action="/accounts/signin" method="POST")
      .form__field
        label.form__label.form__label--large Username
        input.form__input(name="username" placeholder="faulty")

      .form__field
        label.form__label.form__label--large Password
        input.form__input(name="password" type="password")

      input.form__submit(type="submit" value="Signin")
