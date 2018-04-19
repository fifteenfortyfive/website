const SCHEDULE_ENTRIES_CONTAINER  = document.querySelector('.schedule-grid__entries');
const SAVE_BUTTON = document.querySelector('.schedule-submit-button');

// Drag and drop support between containers.
var schedule_drag_manager = dragula([SCHEDULE_ENTRIES_CONTAINER]);


// Button for saving the current teams to the server.
SAVE_BUTTON.addEventListener('click', function(evt) {
  // teams = TEAMS_CONTAINER.querySelectorAll('.team:not(.team--template)');

  // teams_data = []
  // teams.forEach(function(team_node) {
  //   runs = [].slice.call(team_node.querySelector('.team__runs').querySelectorAll('.run'));

  //   teams_data.push({
  //     id:     team_node.querySelector('.team__id').value,
  //     name:   team_node.querySelector('.team__name').value,
  //     color:  team_node.querySelector('.team__color').value,
  //     runs:   runs.map(function(r) { return r.getAttribute('data-run-id'); })
  //   });
  // });

  // fetch('/admin/teams/save', {
  //   method: 'POST',
  //   credentials: 'same-origin',
  //   body: JSON.stringify(teams_data),
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // }).catch(function(error) { return console.error('Error:', error) })
  // .then(function(response) { return console.log('Success:', response) });
});
