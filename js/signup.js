horsey(document.querySelector('.signup__find-game__input'), {
  source: [{ list: [
    { id: 'sm64',    game: 'Super Mario 64', category: '120 Star' },
    { id: 'sms',     game: 'Super Mario Sunshine', category: '120 Shine' },
    { id: 'smg1',    game: 'Super Mario Galaxy 1', category: '120 Star' },
    { id: 'smg2',    game: 'Super Mario Galaxy 2', category: '242 Star' },
    { id: 'kazooie', game: 'Banjo Kazooie', category: '100%' },
    { id: 'tooie',   game: 'Banjo Tooie', category: '100%' },
    { id: 'dk64',    game: 'Donkey Kong 64', category: '101%' },
    { id: 'crash1',  game: 'Crash 1', category: '100%' },
    { id: 'crash2',  game: 'Crash 2', category: '100%' },
    { id: 'crash3',  game: 'Crash 3', category: '105%' },
    { id: 'spyro1',  game: 'Spyro 1', category: '120%' },
    { id: 'spyro2',  game: 'Spyro 2', category: '100%' },
    { id: 'spyro3',  game: 'Spyro 3', category: '117%' }
  ]}],
  getText: 'game',
  getValue: 'id',
  renderItem: function (li, suggestion) {
    li.innerHTML =
      '<img class="autocomplete__boxart" src="res/' + suggestion.id + '.jpg" />' +
      '<span class="autocomplete__content">' +
        '<span class="autocomplete__game">' + suggestion.game + '</span>' +
        ' - ' +
        '<span class="autocomplete__category">' + suggestion.category + '</span>' +
      '</span>';
  },
  noMatches: "No matches",
  debounce: 50,
  appendTo: document.querySelector(".signup__find-game"),
  limit: 5
});
