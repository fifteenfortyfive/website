.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Commentator Registration

      form.form(action="/register/commentator/submit" method="POST")
        p.lead This year we'll be trying something new and having commentators on the stream to actively pick out and talk about interesting things happening during the event.

        p We're looking for people who are confident with the routes and strats for the games of one or more series to provide commentary about them for the viewers. You'll be grouped with 2-3 other commentators familiar with the other series so that all of the runs happening at the time are covered.


        .form__field
          label.form__label.form__label--large Games
          input.form__input(value=submission.try(&.games) name="games" placeholder="Mario series, crash 3, etc.")

        p Do you have any experience commentating runs at other events? Please provide links to relevant videos if you have them.

        .form__field
          label.form__label.form__label--large Experience
          textarea.form__input(name="experience")= submission.try(&.experience)


        h3 Scheduling

        p Commentators will be live on the stream for roughly 4 hours at a time, and will likely have 2-4 shifts over the course of the weekend (depending on turnout).

        p Are there any times that you are specifically available or unavailable during the event?

        .form__field
          label.form__label.form__label--large Availability
          input.form__input(value=submission.try(&.availability) name="availability" placeholder="Only on Sunday...")

        h3 Submission

        p Thanks for your interest in being a commentator! We'll be in contact in the coming months with more information.

        p In the meantime, if you have any other questions, please contact an organizer in our Discord.

        - if submission
          input(type="hidden" name="submission_id" value=submission.id )
        input.form__submit(type="submit")
