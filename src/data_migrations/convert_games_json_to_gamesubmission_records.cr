# Only run after `20180307212815_create_gamesubmission_table.sql` has been run.
require "pg"
require "crecto"

require "../fifteenfortyfive/repo.cr"
require "../fifteenfortyfive/models/**"


submissions = Repo.all(RunnerSubmission, preload: [:account])
games = Repo.all(Game)

game_map = {
  "sm64"      => games.find{ |g| g.name == "SM64" }.not_nil!,
  "sms"       => games.find{ |g| g.name == "Sunshine" }.not_nil!,
  "smg1"      => games.find{ |g| g.name == "Galaxy 1" }.not_nil!,
  "smg2"      => games.find{ |g| g.name == "Galaxy 2" }.not_nil!,
  "kazooie"   => games.find{ |g| g.name == "Kazooie" }.not_nil!,
  "tooie"     => games.find{ |g| g.name == "Tooie" }.not_nil!,
  "dk64"      => games.find{ |g| g.name == "DK64" }.not_nil!,
  "spyro1"    => games.find{ |g| g.name == "Spyro 1" }.not_nil!,
  "spyro2"    => games.find{ |g| g.name == "Spyro 2" }.not_nil!,
  "spyro3"    => games.find{ |g| g.name == "Spyro 3" }.not_nil!,
  "crash1"    => games.find{ |g| g.name == "Crash 1" }.not_nil!,
  "crash2"    => games.find{ |g| g.name == "Crash 2" }.not_nil!,
  "crash3"    => games.find{ |g| g.name == "Crash 3" }.not_nil!
}

submissions.each do |sub|
  sub.games.each_with_index do |game_data, idx|
    game = game_map[game_data["game"].as_h["id"]]

    game_submission = GameSubmission.new
    game_submission.runner_submission = sub
    game_submission.account = sub.account
    game_submission.game = game
    game_submission.pb = game_data["pb"].to_s
    game_submission.estimate = game_data["est"].to_s
    game_submission.priority = idx

    puts "Creating #{game_submission.to_json}"
    Repo.insert(game_submission)
  end
end

puts "\nCompleted Successfully!".colorize(:green)
