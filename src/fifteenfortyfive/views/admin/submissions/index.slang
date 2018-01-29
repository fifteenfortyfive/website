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
            th Max games
            th Max time
            th Pair with
            th Avoid
            th Captain?

        tbody
          - runner_submissions.each do |sub|
            tr
              td = sub.account.username
              td
                ul
                  - sub.games.each do |game|
                    - game_data = game["game"].as(Hash(String, JSON::Type))
                    li
                      strong= game_data["short_name"]
                      | -
                      strong= game_data["category"]
                      | in
                      strong= game["est"]

              td = sub.max_games
              td = sub.max_time
              td = sub.pair
              td = sub.avoid
              td = sub.captain ? "yes" : "no"


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
