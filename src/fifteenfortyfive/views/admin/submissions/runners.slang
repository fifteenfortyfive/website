.runner-submissions__table-container
  table.table.table-striped.runner-submissions__table
    thead
      tr
        th(width="260px" data-sort-default="true")
          | Runner
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="sm64")
          | SM64
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="sms")
          | Sunshine
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="smg1")
          | Galaxy 1
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="smg2")
          | Galaxy 2
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="kazooie")
          | Kazooie
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="tooie")
          | Tooie
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="dk64")
          | DK64
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="spyro1")
          | Spyro 1
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="spyro2")
          | Spyro 2
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="spyro3")
          | Spyro 3
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="crash1")
          | Crash 1
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="crash2")
          | Crash 2
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down
        th(width="7%" class="crash3")
          | Crash 3
          span.sort-ascending.fas.fa-chevron-up
          span.sort-descending.fas.fa-chevron-down

    tbody
      - runner_submissions.each do |sub|
        - row_class = sub.revoked ? "submission--revoked" : ""
        tr(class=row_class )
          td.runner-cell(width="260px")
            h4.runner-submission__name== sub.account.username

            .runner-submission__detail
              .row
                .col-xs-5
                  strong Captain?
                  = sub.captain ? "Yes" : "No"
                  p
                    strong Pair:
                    br
                    span== sub.pair || "--"
                  p
                    strong Avoid:
                    br
                    span== sub.avoid || "--"
                .col-xs-5
                  p
                    strong Max games
                    br
                    span= sub.max_games || "--"
                  p
                    strong Max time
                    br
                    span= sub.max_time || "--"

                  strong Preference
                  ol.list--condensed
                    - sub.games.each do |g|
                      li= g["game"].as(Hash(String, JSON::Type))["name"]


          - ["sm64", "sms", "smg1", "smg2", "kazooie", "tooie", "dk64", "spyro1", "spyro2", "spyro3", "crash1", "crash2", "crash3"].each do |name|
            td(width="7%" class=name )
              - if game = sub.games.find{ |g| name == g["game"].as(Hash(String, JSON::Type))["id"] }
                strong= game["est"]
                br
                span= game["pb"]


script(src="/js/tablesort.min.js")
javascript:
  var table = new Tablesort(document.querySelector('.runner-submissions__table'));
