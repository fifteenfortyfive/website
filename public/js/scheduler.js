const SCHEDULE_ENTRIES_CONTAINER  = document.querySelector('.schedule-grid__entries');
const SAVE_BUTTON = document.querySelector('.schedule-submit-button');
const FLASH_CONTAINER = document.querySelector('.flash-container');

// Drag and drop support between containers.
var schedule_drag_manager = dragula([SCHEDULE_ENTRIES_CONTAINER]);


function flash(kind, message) {
  let flash_element = document.createElement('div');
  flash_element.classList.add('flash-message');
  flash_element.classList.add('--' + kind);
  flash_element.innerText = message;

  FLASH_CONTAINER.appendChild(flash_element);

  setTimeout(function() {
    flash_element.remove();
  }, 3000);
}

// Button for saving the current teams to the server.
SAVE_BUTTON.addEventListener('click', function(evt) {
  const runs = SCHEDULE_ENTRIES_CONTAINER.querySelectorAll('.schedule-entry');
  let params = {
    run_ids: []
  };

  runs.forEach(function(run) {
    params["run_ids"].push(run.getAttribute('data-run-id'));
  })

  console.log(params);

  fetch(window.location.href + '/save', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).catch(function(error) { flash("error", "Couldn't connect to server."); })
  .then(function(response) {
    if(!response.ok) {
      flash("error", "Failed to save schedule.");
    } else {
      flash("success", "Successfully saved schedule.");
    }
  });
});
