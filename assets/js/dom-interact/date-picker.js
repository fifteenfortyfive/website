import flatpickr from "flatpickr";

document.addEventListener('DOMContentLoaded', () => {
  flatpickr(".js-datepicker", {
    enableTime: true,
    dateFormat: 'Z',
    altInput: true,
    altFormat: 'Y-m-d h:i K'
  });
});
