.container
  .row
    .col-sm-10
      .page-header
        h1 Create an Account


      h3 Account Setup

      p Starting with this event, we'll be creating profiles for runners, volunteers, and other users. These profiles will be used to track your submissions and to create a profile page to display during the event. You'll also be able to log in and edit your information (including submissions, PBs, and estimates) later on.

      p Since this is the first event where we're doing this, everyone will need to sign up for a new account.
        em We promise won't send you any annoying emails or other notifications. We don't even ask for your email address :)

    form.form(action="/accounts/create" method="POST")
      .form__field
        label.form__label.form__label--large Username
        input.form__input(name="username" placeholder="faulty")

      .form__field
        label.form__label.form__label--large Password
        input.form__input(name="password" type="password")

      .form__field
        label.form__label.form__label--large Confirm
        input.form__input(name="confirm_password" type="password")

      input.form__submit(type="submit")
