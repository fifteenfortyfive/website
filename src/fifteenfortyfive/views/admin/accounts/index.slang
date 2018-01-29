.container
  .row
    .col-sm-10
      .page-header
        h1 Accounts

      table.table.table-striped
        thead
          tr
            th Username
            th Social Media
            th Timezone
            th Admin?

        tbody
          - accounts.each do |account|
            tr
              td == account.username
              td
                p
                  span.fab.fa-discord
                  == account.discord
                p
                  span.fab.fa-twitch
                  == account.twitch
                p
                  span.fab.fa-twitter
                  == account.twitter
              td = account.timezone
              td = account.admin ? "yes" : "no"
