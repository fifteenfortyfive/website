          | runner
          | captain
          | pair
          | avoid
          | max games
          | max time
          | sm64_pref
          | sm64_pb
          | sm64_est
          | sunshine_pref
          | sunshine_pb
          | sunshine_est
          | galaxy1_pref
          | galaxy1_pb
          | galaxy1_est
          | galaxy2_pref
          | galaxy2_pb
          | galaxy2_est
          | kazooie_pref
          | kazooie_pb
          | kazooie_est
          | tooie_pref
          | tooie_pb
          | tooie_est
          | dk64_pref
          | dk64_pb
          | dk64_est
          | spyro1_pref
          | spyro1_pb
          | spyro1_est
          | spyro2_pref
          | spyro2_pb
          | spyro2_est
          | spyro3_pref
          | spyro3_pb
          | spyro3_est
          | crash1_pref
          | crash1_pb
          | crash1_est
          | crash2_pref
          | crash2_pb
          | crash2_est
          | crash3_pref
          | crash3_pb
          | crash3_est

          = sub.account.username
          = sub.captain ? "Yes" : "No"
          = sub.pair
          = sub.avoid
          = sub.max_games
          = sub.max_time
          = sub.games.map{ |g| g["game"].as_h["id"] }.join(".")
          - ["sm64", "sms", "smg1", "smg2", "kazooie", "tooie", "dk64", "spyro1", "spyro2", "spyro3", "crash1", "crash2", "crash3"].each do |name|
              - if game = sub.games.find{ |g| name == g["game"].as_h["id"] }
                strong= game["est"]
                br
                span= game["pb"]


script(src="/js/tablesort.min.js")
javascript:
  var table = new Tablesort(document.querySelector('.runner-submissions__table'));
