import DateTime from 'luxon/src/datetime';
import Duration from 'luxon/src/duration';

export default {
  // Converts from seconds to a Luxon Duration object.
  fromSeconds(seconds) {
    if (typeof seconds !== 'number') {
      seconds = parseInt(seconds);
    }

    return Duration.fromMillis(seconds * 1000).toFormat('hh:mm:ss');
  },

  // Converts from 00:00:00 to seconds
  timeStringToSeconds(string) {
    const [hoursRaw, minutesRaw, secondsRaw] = string.split(':');
    const hours = parseInt(hoursRaw);
    if (isNaN(hours)) return 0;

    const minutes = parseInt(minutesRaw);
    if (isNaN(minutes)) return hours * 3600;

    const seconds = parseInt(secondsRaw);
    if (isNaN(seconds)) return hours * 3600 + minutes * 60;

    return hours * 3600 + minutes * 60 + seconds;
  },

  // Converts from 00:00:00 to a Luxon Duration object
  fromTimeString(string) {
    return fromSeconds(timeStringToSeconds(string));
  },

  // Converts from seconds to 00:00:00
  secondsToString(rawSeconds, stringifyNull = false) {
    if (!rawSeconds) return stringifyNull ? '00:00:00' : null;
    if (typeof rawSeconds !== 'number') {
      rawSeconds = parseInt(rawSeconds);
    }

    if (isNaN(rawSeconds)) return stringifyNull ? '00:00:00' : null;

    const hours = Math.floor(rawSeconds / 3600);
    const minutes = Math.floor(rawSeconds / 60) % 60;
    const seconds = rawSeconds % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  },
};
