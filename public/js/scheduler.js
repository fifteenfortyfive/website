const SCHEDULE_CONTAINER  = document.querySelector('.schedule-grid');


// Drag and drop support between containers.
var teams_drag_manager = dragula({
  revertOnSpill: true,
  isContainer: function(el) {
    return el == RUNS_CONTAINER || el.classList.contains('team__runs');
  },
}).on('drop', function(el, target) {
  console.log(target);
  if(target == RUNS_CONTAINER) {
    el.classList.add('run--block');
    el.classList.remove('run--inline');
  } else {
    el.classList.remove('run--block');
    el.classList.add('run--inline');
  }
});



// Button for adding a new team.
ADD_TEAM_BUTTON.addEventListener('click', function(evt) {
  team_node = TEAM_TEMPLATE.cloneNode(true);
  team_node.classList.remove('team--template');

  TEAMS_CONTAINER.appendChild(team_node);
  teams_drag_manager.containers.push(team_node.querySelector('.team__runs'));
});



// Button for saving the current teams to the server.
SAVE_BUTTON.addEventListener('click', function(evt) {
  teams = TEAMS_CONTAINER.querySelectorAll('.team:not(.team--template)');

  teams_data = []
  teams.forEach(function(team_node) {
    runs = [].slice.call(team_node.querySelector('.team__runs').querySelectorAll('.run'));

    teams_data.push({
      id:     team_node.querySelector('.team__id').value,
      name:   team_node.querySelector('.team__name').value,
      color:  team_node.querySelector('.team__color').value,
      runs:   runs.map(function(r) { return r.getAttribute('data-run-id'); })
    });
  });

  fetch('/admin/teams/save', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(teams_data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).catch(function(error) { return console.error('Error:', error) })
  .then(function(response) { return console.log('Success:', response) });
});
