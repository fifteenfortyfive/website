// %B %d, %Y %H:%M:%S %z
import { DateTime } from "luxon";

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(".js-date-string.js-localized");

  elements.forEach((element) => {
    const timeSeconds = parseInt(element.innerHTML.trim());
    if(isNaN(timeSeconds)) return;

    const dateTime = DateTime.fromSeconds(timeSeconds);

    element.dataset.originalTimeSeconds = timeSeconds;
    element.innerHTML = dateTime.toLocaleString({
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  });
});
