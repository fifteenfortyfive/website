.container
  .row
    .col-sm-10
      .page-header
        h1 Feature Flags


      table.table
        thead
          tr
            th Flag
            th Status
            th Toggle

        tbody
          - env.feature_flags.each do |(name, flag)|
            tr
              td= name
              td= flag.enabled ? "on" : "off"
              td
                - if flag.enabled
                  a(href="/admin/feature_flags/#{name}/disable") Disable
                -else
                  a(href="/admin/feature_flags/#{name}/enable") Enable

  .row
    .col-sm-4
      .page-header
        h1 Create New Flag

      form.form(action="/admin/feature_flags/create" method="POST")
        .form__field
          label.form__label Name
          input.form__input(name="name" placeholder="flag name...")

        input.form__submit(type="submit" value="Create")
