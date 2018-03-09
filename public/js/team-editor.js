// This file assumes that a global variable `runs` exists, containing the json
// representation of available runs for team building.
var RUNS_FILTER     = document.querySelector('.runs-filter');
var RUNS_CONTAINER  = document.querySelector('.runs-list');
var RUN_TEMPLATE    = document.querySelector('.run--template');
var TEAMS_CONTAINER = document.querySelector('.teams-list');
var TEAM_TEMPLATE   = document.querySelector('.team--template')
var ADD_TEAM_BUTTON = document.querySelector('.add-team-button');
var SAVE_BUTTON     = document.querySelector('.save-button');

// Fuzzysearch implementation taken from:
// https://github.com/bevacqua/fuzzysearch/blob/master/index.js
function fuzzysearch(needle, haystack) {
  var hlen = haystack.length;
  var nlen = needle.length;
  if(nlen > hlen) {
    return false;
  }
  if(nlen === hlen) {
    return needle === haystack;
  }
  outer: for(var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while(j < hlen) {
      if(haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}


runs.forEach(function(run) {
  var run_node = RUN_TEMPLATE.cloneNode(true);
  run_node.classList.remove('run--template');
  run_node.classList.add('run--block');

  run_node.querySelector('.run__game-name').innerText   = run.game;
  run_node.querySelector('.run__runner-name').innerText = run.runner;
  run_node.querySelector('.run__runner-id').innerText   = run.runner_id;
  run_node.querySelector('.run__pb').innerText          = run.pb;
  run_node.querySelector('.run__estimate').innerText    = run.estimate;
  run_node.setAttribute('data-gs-id', run.id);

  RUNS_CONTAINER.appendChild(run_node);
});


// Drag and drop support between containers.
var teams_drag_manager = dragula([RUNS_CONTAINER], {
  revertOnSpill: true,
  accepts: function(el, target) {
    return target !== RUNS_CONTAINER
  }
}).on('drop', function(el) {
  el.classList.remove('run--block');
  el.classList.add('run--inline');
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
      name:   team_node.querySelector('.team__name').value,
      color:  team_node.querySelector('.team__color').value,
      runs:   runs.map(function(r) { return r.getAttribute('data-gs-id'); })
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



// Run filtering
RUNS_FILTER.addEventListener('keyup', function(evt) {
  query = evt.target.value.toLowerCase();

  RUNS_CONTAINER.querySelectorAll('.run').forEach(function(run_node) {
    game_name = run_node.querySelector('.run__game-name').innerText.toLowerCase();
    runner_name = run_node.querySelector('.run__runner-name').innerText.toLowerCase();

    if(fuzzysearch(query, game_name) || fuzzysearch(query, runner_name)) {
      run_node.classList.remove('hidden');
    } else {
      run_node.classList.add('hidden');
    }
  });
});