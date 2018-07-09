function increment_timers() {
  [].forEach.call(document.querySelectorAll(".live-timer"), function(timer) {
    if(timer.dataset.started_at) {
      let now = moment().unix();
      let start_time = parseInt(timer.dataset.started_at);
      timer.innerText = moment.duration(now - start_time, 's').format("hh:mm:ss", { trim: false });
    } else {
      let previous_time = moment.duration(timer.innerText);
      timer.innerText = previous_time.add(1, 's').format("hh:mm:ss", { trim: false });
    }
  });
}

setInterval(increment_timers, 1000);
