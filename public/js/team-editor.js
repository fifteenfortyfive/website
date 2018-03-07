// This file assumes that a global variable `runs` exists, containing the json
// representation of available runs for team building.

var RUNS_CONTAINER  = document.querySelector('.runs-list');
var RUN_TEMPLATE    = document.querySelector('.run--template');
var TEAMS_CONTAINER = document.querySelector('.teams-list');
var TEAM_TEMPLATE   = document.querySelector('.team--template')
var ADD_TEAM_BUTTON = document.querySelector('.add-team-button');

runs.forEach(function(run) {
  var run_node = RUN_TEMPLATE.cloneNode(true);
  run_node.classList.remove('run--template');
  run_node.classList.add('run--block');

  run_node.querySelector('.run__game-name').innerText   = run.game;
  run_node.querySelector('.run__runner-name').innerText = run.runner;
  run_node.querySelector('.run__runner-id').innerText   = run.runner_id;
  run_node.querySelector('.run__pb').innerText          = run.pb;
  run_node.querySelector('.run__estimate').innerText    = run.estimate;

  RUNS_CONTAINER.appendChild(run_node);
});


ADD_TEAM_BUTTON.addEventListener('click', function(evt) {
  var team_node = TEAM_TEMPLATE.cloneNode(true);
  team_node.classList.remove('team--template');

  TEAMS_CONTAINER.appendChild(team_node);
});
