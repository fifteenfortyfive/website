.container
  .row
    .col-sm-10
      .page-header
        h1 Admin Dashboard

      h2 Submissions
      ul
        li
          a(href="/admin/submissions") Manage Submissions
        li
          a(href="/admin/submissions/runners") Runner Submissions Table
        li
          | Export Runner Submissions
          ul
            li
              a(href="/admin/submissions/export.csv") as CSV

      h2 Event Management
      ul
        li
          a(href="/admin/teams") Manage teams

      h2 Account management
      ul
        li
          a(href="/admin/accounts") View accounts

      h2 Ops
      ul
        li
          a(href="/admin/feature_flags") Manage Feature Flags
