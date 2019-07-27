import DateTime from 'luxon/src/datetime';
import Duration from 'luxon/src/duration';

export function getUTCNow() {
  return DateTime.utc();
}

export function runTime(seconds) {
  return Duration.fromMillis(seconds * 1000).toFormat("hh:mm:ss");
}

export function timeFromISO(timeString) {
  return DateTime.fromISO(timeString, {zone: 'utc'});
}

export function runTimeFromStart(startString) {
  return DateTime.utc()
      .diff(timeFromISO(startString))
      .toFormat("hh:mm:ss");
}

export function simpleDate(date) {
  return timeFromISO(date).toLocaleString({
    year: 'numeric',
    month: 'long',
  });
}

export function fullDate(date) {
  return timeFromISO(date).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}

export function simpleDateTime(date) {
  return timeFromISO(date).toLocaleString({
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}


export function getThumbnailURL(urlTemplate, width, height) {
  return urlTemplate
      .replace("{width}", width)
      .replace("{height}", height);
};
