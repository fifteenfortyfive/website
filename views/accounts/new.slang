.container
  .row
    .col-sm-10
      .page-header
        h1 Create an Account


    .signup__account-info
      h3 Account Setup

      p Starting with this event, we'll be creating profiles for runners, volunteers, and other users. These profiles will be used to track your submissions and to create a profile page to display during the event. You'll also be able to log in and edit your information (including submissions, PBs, and estimates) later on.

      p Since this is the first event where we're doing this, everyone will need to sign up for a new account.
        em We promise won't send you any annoying emails or other notifications. We don't even ask for your email address :)

      .signup-field.signup-field--full-width.account-info__username
        label.signup__game__label.signup__game__label--large Username
        input.signup__game__input(placeholder="faulty")

      .signup-field.signup-field--full-width.account-info__password
        label.signup__game__label.signup__game__label--large Password
        input.signup__game__input(type="password")

      .signup-field.signup-field--full-width.account-info__password-confirm
        label.signup__game__label.signup__game__label--large Confirm
        input.signup__game__input(type="password")
