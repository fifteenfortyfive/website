import {DateTime} from 'luxon';
import Duration from 'luxon/src/duration';


export function runTime(seconds) {
  return Duration.fromMillis(seconds * 1000).toFormat("hh:mm:ss");
}

export function simpleDate(date) {
  const dt = DateTime.fromISO(date);
  return dt.toLocaleString({
    year: 'numeric',
    month: 'long',
  });
}
