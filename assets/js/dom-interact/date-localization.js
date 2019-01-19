// %B %d, %Y %H:%M:%S %z
import { DateTime } from "luxon";

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(".js-date-string.js-localized");

  elements.forEach((element) => {
    const timeString = parseInt(element.innerHTML.trim());
    const dateTime = DateTime.fromSeconds(timeString);
    console.log(dateTime)

    element.dataset.originalTimeString = timeString;
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
