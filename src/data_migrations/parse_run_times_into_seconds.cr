# Only run after `20180418155621_add_parsed_time_fields_to_runs.sql` has been run.
require "pg"
require "crecto"

require "../fifteenfortyfive/repo.cr"
require "../fifteenfortyfive/models/**"


# A list of the time formats that I've seen from accounts on the site.
# Ordering is somewhat important here. Crystal's Time parser doesn't care
# if the whole string is consumed, so something like `%H:%M` coming before
# `%H:%M:%S` would ignore the `seconds` component of the entered time.
#
# If a time doesn't match _any_ of these formats, it will end up becoming
# nil in the database.
KNOWN_FORMATS = [
  "%H:%M:%S",
  "%H:%M",
  "%H.%M"
]


def to_seconds(time : Time)
  time.hour * 3600 +
  time.minute * 60 +
  time.second
end


runs = Repo.all(Run)
runs.each do |run|
  run.estimate_seconds =
    if estimate = run.estimate
      KNOWN_FORMATS.each do |format|
        break to_seconds(Time.parse(estimate, format))
      rescue
        nil
      end
    end

  run.pb_seconds =
    if pb = run.pb
      KNOWN_FORMATS.each do |format|
        break to_seconds(Time.parse(pb, format))
      rescue
        nil
      end
    end

  Repo.update(run)
end
