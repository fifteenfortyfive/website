# Only run after `20180422152053_create_stream_ids.sql` has been run.
require "pg"
require "crecto"

require "../mcsn/constants.cr"
require "../mcsn/repo.cr"
require "../mcsn/models/**"
require "../mcsn/services/**"

accounts = Repo.all(Account)

# Twitch's API is finicky. Requesting user info for an account that doesn't
# exist returns an ERROR, instead of no info, so attempting to access info for
# all accounts at once is impossible (since we can't guarantee that everyone
# entered their information correctly).
#
# They also rate limit you to 30 requests per minute, or one every 2 seconds.
# This is also incredibly low and means this will take ~5 minutes to run for
# the 140 accounts currently on the site.
#
# Thanks, Twitch.
puts "Starting StreamID pull from Twitch for #{accounts.size} accounts."
puts "Estimated time: #{accounts.size * 2.0 / 60} minutes"
index = 0
accounts.each_with_index do |account, index|
  sleep(2)
  puts "#{index + 1}/#{accounts.size}: Loading ID for #{account.username} (#{account.twitch})"
  TwitchService.get_user_id_for(account)
end

puts "Finished loading stream ID info"
