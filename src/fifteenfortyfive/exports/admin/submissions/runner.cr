require "csv"
require "json"

class Export::Admin::RunnerSubmissions
  def initialize(@submissions : Array(RunnerSubmission))
  end

  def to_csv
    CSV.build do |csv|
      csv.row(
        "runner", "captain", "pair", "avoid", "max games", "max time", "pref_order",
        "sm64_pref", "sm64_pb", "sm64_est", "sunshine_pref", "sunshine_pb", "sunshine_est",
        "galaxy1_pref", "galaxy1_pb", "galaxy1_est", "galaxy2_pref", "galaxy2_pb", "galaxy2_est",
        "kazooie_pref", "kazooie_pb", "kazooie_est", "tooie_pref", "tooie_pb", "tooie_est",
        "dk64_pref", "dk64_pb", "dk64_est", "spyro1_pref", "spyro1_pb", "spyro1_est",
        "spyro2_pref", "spyro2_pb", "spyro2_est", "spyro3_pref", "spyro3_pb", "spyro3_est",
        "crash1_pref", "crash1_pb", "crash1_est", "crash2_pref", "crash2_pb", "crash2_est",
        "crash3_pref", "crash3_pb", "crash3_est")

      @submissions.each do |sub|
        csv.row do |row|
          row << sub.account.username
          row << sub.captain
          row << sub.pair
          row << sub.avoid
          row << sub.max_games
          row << sub.max_time
          row << sub.games.map { |g| g["game"].as_h["id"] }.join(",")
          ["sm64", "sms", "smg1", "smg2", "kazooie", "tooie", "dk64", "spyro1", "spyro2", "spyro3", "crash1", "crash2", "crash3"].each do |name|
            if game = sub.games.find { |g| name == g["game"].as_h["id"] }
              row << sub.games.index(game).try(&.+(1))
              row << game["est"]
              row << game["pb"]
            else
              row.skip_cell
              row.skip_cell
              row.skip_cell
            end
          end
        end
      end
    end
  end

  def to_json
  end
end
