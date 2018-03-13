.container.team-show-page(style="--color: ##{team.color}")
  .row
    .col-sm-10
      .page-header.colored
        h1
          | Editing
          == team.name


      form.form(action="/teams/#{team.slug}/update" method="POST")
        .form__field
          label.form__label.form__label--large Team Name
          input.form__input(name="name" value=team.name required="true")

        .form__field
          label.form__label.form__label--large URL slug
          span.form__leadin \/teams/
          input.form__input(name="slug" value=team.slug required="true")


        input.form__submit(type="submit")
