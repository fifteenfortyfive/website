horsey(document.querySelector('.signup__find-game__input'), {
  source: [{ list: [
    { value: 'sm64',    text: 'Super Mario 64 - 120 Star' },
    { value: 'sms',     text: 'Super Mario Sunshine - 120 Shine' },
    { value: 'smg1',    text: 'Super Mario Galaxy 1 - 120 Star' },
    { value: 'smg2',    text: 'Super Mario Galaxy 2 - 242 Star' },
    { value: 'kazooie', text: 'Banjo Kazooie - 100%' },
    { value: 'tooie',   text: 'Banjo Tooie - 100%' },
    { value: 'dk64',    text: 'Donkey Kong 64 - 101%' },
    { value: 'crash1',  text: 'Crash 1 - 100%' },
    { value: 'crash2',  text: 'Crash 2 - 100%' },
    { value: 'crash3',  text: 'Crash 3 - 105%' },
    { value: 'spyro1',  text: 'Spyro 1 - 120%' },
    { value: 'spyro2',  text: 'Spyro 2 - 100%' },
    { value: 'spyro3',  text: 'Spyro 3 - 117%' }
  ]}],
  getText: 'text',
  getValue: 'value',
  renderItem: function (li, suggestion) {
    var image = '<img class="autocomplete-boxart" src="res/' + suggestion.value + '.jpg" /> ';
    li.innerHTML = image + suggestion.text;
  }
});
