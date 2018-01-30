.container
  .row
    .col-sm-10
      .page-header
        h1 Runner Submissions

      table.table.table-striped
        thead
          tr
            th Runner
            th Games
            th Limits
            th Teaming

        tbody
          - runner_submissions.each do |sub|
            tr
              td
                h4.runner-submission__name= sub.account.username
                p.runner-submission__detail
                  strong Captain?
                  = sub.captain ? "Yes" : "No"
              td
                ul.runner-submission__games
                  - sub.games.each do |game|
                    - game_data = game["game"].as(Hash(String, JSON::Type))
                    li.runner-submission__game
                      strong= game_data["short_name"]
                      | -
                      strong= game_data["category"]
                      | in
                      strong= game["est"]

              td
                p
                  strong Games:
                  = sub.max_games
                p
                  strong Time:
                  = sub.max_time

              td
                p
                  strong Pair with:
                  = sub.pair
                p
                  strong Avoid:
                  = sub.avoid


      .page-header
        h1 Commentator Submissions

      table.table.table-striped
        thead
          tr
            th User
            th Games
            th Experience
            th Availability

        tbody
          - commentator_submissions.each do |sub|
            tr
              td = sub.account.username
              td = sub.games
              td = sub.experience
              td = sub.availability
