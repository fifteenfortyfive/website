var AVAILABLE_GAMES = [
  { id: 'sm64',    short_name: 'SM64', name: 'Super Mario 64', category: '120 Star' },
  { id: 'sms',     short_name: 'Sunshine', name: 'Super Mario Sunshine', category: '120 Shine' },
  { id: 'smg1',    short_name: 'Galaxy 1', name: 'Super Mario Galaxy 1', category: '120 Star' },
  { id: 'smg2',    short_name: 'Galaxy 2', name: 'Super Mario Galaxy 2', category: '242 Star' },
  { id: 'kazooie', short_name: 'Kazooie', name: 'Banjo Kazooie', category: '100%' },
  { id: 'tooie',   short_name: 'Tooie', name: 'Banjo Tooie', category: '100%' },
  { id: 'dk64',    short_name: 'DK64', name: 'Donkey Kong 64', category: '101%' },
  { id: 'crash1',  short_name: 'Crash 1', name: 'Crash 1', category: '100%' },
  { id: 'crash2',  short_name: 'Crash 2', name: 'Crash 2', category: '100%' },
  { id: 'crash3',  short_name: 'Crash 3', name: 'Crash 3', category: '105%' },
  { id: 'spyro1',  short_name: 'Spyro 1', name: 'Spyro 1', category: '120%' },
  { id: 'spyro2',  short_name: 'Spyro 2', name: 'Spyro 2', category: '100%' },
  { id: 'spyro3',  short_name: 'Spyro 3', name: 'Spyro 3', category: '117%' }
];

var GAME_CARD_TEMPLATE = document.querySelector('.signup__game--blank');
var FIND_GAME_INPUT = document.querySelector('.signup__find-game__input');
var GAME_SELECTION_CONTAINER = document.querySelector('.signup__selected-games');


// Sortability
dragula([GAME_SELECTION_CONTAINER], {
  moves: function(el, source, handle, sibling) {
    return handle.closest('.handle') !== null;
  },
});
// Disable scrolling while dragging on mobile.
window.addEventListener('touchmove', function() {});


// Search input
var games_not_selected = AVAILABLE_GAMES.slice(0);

horsey(FIND_GAME_INPUT, {
  source: [{ list: games_not_selected }],
  getText: 'name',
  getValue: 'id',
  renderItem: function (li, suggestion) {
    li.innerHTML =
      '<img class="autocomplete__boxart" src="res/' + suggestion.id + '.jpg" />' +
      '<span class="autocomplete__content">' +
        '<span class="autocomplete__game">' + suggestion.name + '</span>' +
        ' - ' +
        '<span class="autocomplete__category">' + suggestion.category + '</span>' +
      '</span>';
  },
  noMatches: "No matches",
  debounce: 50,
  appendTo: document.querySelector(".signup__find-game"),
  limit: 5
});


// Add a Game button handler
document.querySelector(".signup__find-game__add-button")
        .addEventListener('click', function(evt) {
    var game_name = FIND_GAME_INPUT.value;
    var game_data = AVAILABLE_GAMES.find(function(e) { return e.name == game_name; });
    console.log(game_data);

    // Create a new game card from the template.
    var new_game = GAME_CARD_TEMPLATE.cloneNode(true);
    new_game.classList.remove('signup__game--blank');

    // Add the game-specific content to the new game card.
    var boxart = document.createElement('img');
    boxart.src = 'res/'+game_data.id+'.jpg';
    new_game.querySelector(".signup__game__boxart").appendChild(boxart);
    new_game.querySelector(".signup__game__name").innerHTML = game_data.short_name;
    new_game.querySelector(".signup__game__category").innerHTML = game_data.category;

    // Insert the new game card into the DOM.
    GAME_SELECTION_CONTAINER.appendChild(new_game);

    // Reset the input and remove the added game from the list of available games.
    FIND_GAME_INPUT.value = '';
    var idx = games_not_selected.indexOf(game_data);
    games_not_selected.splice(idx, 1);
});


// Submit
document.querySelector(".signup__submit")
        .addEventListener('click', function(evt) {
  var game_nodes = Array.prototype.slice.call(document.querySelectorAll('.signup__game:not(.signup__game--blank)'));
  var game_selections = game_nodes.map(function(el) {
    return {
      name: el.querySelector('.signup__game__name').innerHTML,
      pb:   el.querySelector('.signup__game__pb .signup__game__input').value,
      est:  el.querySelector('.signup__game__estimate .signup__game__input').value
    }
  });

  var submission_data = {
    discord:    document.querySelector('.signup__runner-info__discord .signup__game__input').value,
    twitch:     document.querySelector('.signup__runner-info__twitch .signup__game__input').value,
    twitter:    document.querySelector('.signup__runner-info__twitter .signup__game__input').value,
    timezone:   document.querySelector('.signup__runner-info__timezone .signup__game__input').value,
    pair:       document.querySelector('.signup__team-requests__pair .signup__game__input').value,
    avoid:      document.querySelector('.signup__team-requests__avoid .signup__game__input').value,
    max_games:  document.querySelector('.signup__limits__games .signup__game__input').value,
    max_time:   document.querySelector('.signup__limits__time .signup__game__input').value,
    games:      game_selections
  };


  nanoajax.ajax({
          url: '/signup/submit',
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(submission_data)
        }, function (code, responseText, request) {
    switch(code) {
      case 200:
        console.log("submitted successfully.");
        break;
      default:
        console.log("sorry, errored.");
        break;
    }
  });
});
