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
var GAME_SELECTION_CONTAINER = document.querySelector('.signup__selected-games');


horsey(document.querySelector('.signup__find-game__input'), {
  source: [{ list: AVAILABLE_GAMES }],
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
    var game_name = document.querySelector('.signup__find-game__input').value;
    var game_data = AVAILABLE_GAMES.find(function(e) { return e.name == game_name; });
    console.log(game_data);

    var new_game = GAME_CARD_TEMPLATE.cloneNode(true);
    new_game.classList.remove('signup__game--blank');

    var boxart = document.createElement('img');
    boxart.src = 'res/'+game_data.id+'.jpg';
    new_game.querySelector(".signup__game__boxart").appendChild(boxart);

    new_game.querySelector(".signup__game__name").innerHTML = game_data.short_name;
    new_game.querySelector(".signup__game__category").innerHTML = game_data.category;

    GAME_SELECTION_CONTAINER.appendChild(new_game);
});
