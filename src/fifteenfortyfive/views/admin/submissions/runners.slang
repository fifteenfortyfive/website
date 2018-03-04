.runner-submissions__table-container
  table.table.table-striped.runner-submissions__table
    thead
      tr
        th(width="12.9%") Runner
        th(width="6.7%" class="sm64")    SM64
        th(width="6.7%" class="sms")     Sunshine
        th(width="6.7%" class="smg1")    Galaxy 1
        th(width="6.7%" class="smg2")    Galaxy 2
        th(width="6.7%" class="kazooie") Kazooie
        th(width="6.7%" class="tooie")   Tooie
        th(width="6.7%" class="dk64")    DK64
        th(width="6.7%" class="spyro1")  Spyro 1
        th(width="6.7%" class="spyro2")  Spyro 2
        th(width="6.7%" class="spyro3")  Spyro 3
        th(width="6.7%" class="crash1")  Crash 1
        th(width="6.7%" class="crash2")  Crash 2
        th(width="6.7%" class="crash3")  Crash 3

    tbody
      - runner_submissions.each do |sub|
        - row_class = sub.revoked ? "submission--revoked" : ""
        tr(class=row_class )
          td.runner-cell(width="22%")
            h4.runner-submission__name= sub.account.username

            .runner-submission__detail
              strong Captain?
              = sub.captain ? "Yes" : "No"
              p
                strong Pair:
                br
                span= sub.pair || "--"
              p
                strong Avoid:
                br
                span = sub.avoid || "--"
              p
                strong Max games
                br
                span= sub.max_games || "--"
              p
                strong Max time
                br
                span = sub.max_time || "--"


          - ["sm64", "sms", "smg1", "smg2", "kazooie", "tooie", "dk64", "spyro1", "spyro2", "spyro3", "crash1", "crash2", "crash3"].each do |name|
            td(width="6%" class=name )
              - if game = sub.games.find{ |g| name == g["game"].as(Hash(String, JSON::Type))["id"] }
                strong= game["est"]
                br
                span= game["pb"]
