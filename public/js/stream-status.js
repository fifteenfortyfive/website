function update_stream_indicators() {
  let elements = Array.from(document.querySelectorAll('.stream-indicator'));
  let account_ids = elements.map(function(elem) { return elem.getAttribute('data-account-id'); });

  if(account_ids.length <= 0) return;
  fetch(`/api/stream-status?account_ids=${account_ids.join(",")}`)
    .catch(function(error) { console.info(`Failed to retrieve stream statuses`); })
    .then(function(response) { return response.json(); })
    .then(function(statuses) {
      for(var id in statuses) {
        let data = statuses[id];
        document.querySelectorAll(`.stream-indicator[data-account-id="${id}"`).forEach(function(element) {
          element.classList.toggle('--active', data.live);
        })
      }
    });
}

update_stream_indicators();
setInterval(update_stream_indicators, 20 * 1000);
