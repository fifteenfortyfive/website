class StatusIndicator {
  constructor(container) {
    this.container = container;
    this.previous_status_kind = null;
    this.previous_status_text = null;
  }

  set_status(kind, text) {
    if(this.previous_status_kind) {
      this.container.classList.remove(this.previous_status_kind);
    }
    this.container.classList.add(kind);
    this.container.querySelector(".status-indicator__text").innerText = text;

    this.previous_status_kind = kind;
    this.previous_status_text = text;
  }
}



class RunManager {
  constructor(element, event_bus) {
    this.element = element;
    this.event_bus = event_bus;

    this.timer          = element.querySelector(".run__timer");
    this.timer_state    = element.querySelector(".run__timer-state");
    this.timer_start    = element.querySelector(".run__timer-start");
    this.timer_finish   = element.querySelector(".run__timer-finish");
    this.timer_resume   = element.querySelector(".run__timer-resume");
    this.timer_reset    = element.querySelector(".run__timer-reset");

    this.run = {
      id: element.dataset.runId,
      state: "ready"
    };

    this.init_action_callbacks();
    this.update_timer_actions();
    this.notify("get_state");
  }

  set_state(state) {
    this.run.state = "ready";

    if(state.actual_start_time) {
      this.start(true, state.actual_start_time);
      this.run.state = "running";
    }

    if(state.actual_end_time) {
      this.stop();
      this.run.state = "finished";
      this.set_time(state.actual_time_seconds);
    }

    this.update_timer_actions();
  }

  init_action_callbacks() {
    const self = this;
    this.timer_start.addEventListener('click', function(evt) {
      self.run.state = "running";
      self.start(true);
      self.update_timer_actions();
      self.notify("start_run");
      return false;
    });

    this.timer_resume.addEventListener('click', function(evt) {
      self.run.state = "running";
      self.start(false);
      self.update_timer_actions();
      self.notify("resume_run");
      return false;
    });

    this.timer_finish.addEventListener('click', function(evt) {
      self.run.state = "finished";
      self.stop();
      self.update_timer_actions();
      self.notify("finish_run");
      return false;
    });

    this.timer_reset.addEventListener('dblclick', function(evt) {
      self.run.state = "ready";
      self.reset();
      self.update_timer_actions();
      self.notify("reset_run");
      return false;
    });
  }

  start(reinit, at) {
    if(reinit) {
      let now = moment(at).unix() || moment().unix();
      this.timer.dataset.started_at = now;
    }
    this.timer.classList.add("live-timer");
  }

  set_time(seconds) {
    console.log(seconds)
    this.timer.innerText = moment.duration(seconds, 's').format("hh:mm:ss", { trim: false });
  }

  stop() {
    this.timer.classList.remove("live-timer");
  }

  reset() {
    this.timer.dataset.started_at = null;
    this.timer.innerText = "00:00:00";
    this.timer.classList.remove("live-timer");
  }

  notify(action) {
    this.event_bus.send(JSON.stringify({
      run_id: this.run.id,
      action: action
    }));
  }

  update_timer_actions() {
    switch(this.run.state) {
      case "ready":
        this.timer_start.style.display = "inherit";
        this.timer_finish.style.display = "none";
        this.timer_resume.style.display = "none";
        this.timer_reset.style.display = "none";
        break;
      case "running":
        this.timer_start.style.display = "none";
        this.timer_finish.style.display = "inherit";
        this.timer_resume.style.display = "none";
        this.timer_reset.style.display = "none";
        break;
      case "finished":
        this.timer_start.style.display = "none";
        this.timer_finish.style.display = "none";
        this.timer_resume.style.display = "inherit";
        this.timer_reset.style.display = "inherit";
        break;
    }

    this.timer_state.innerText = this.run.state;
  }
}



class RunnerDashboard {
  constructor(container) {
    const self = this;
    var base_uri = (window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host;
    this.socket = new WebSocket(base_uri + "/runner");
    this.container = container;
    this.indicators = {
      server:     new StatusIndicator(container.querySelector(".status--server_connection")),
      twitch:     new StatusIndicator(container.querySelector(".status--stream_status")),
      on_stream:  new StatusIndicator(container.querySelector(".status--on_stream"))
    }
    this.init_socket_lifecycle_callbacks();
    this.socket.onmessage = function(msg) {
      self.handle_message(msg);
    }
  }

  handle_message(msg) {
    const message = JSON.parse(msg.data);
    switch(message.type) {
      case "get_state":
        let run = this.runs[message.run.id];
        run.set_state(message.run);
        break;

      case "healthcheck":
        this.update_health(message.statuses);
        break;
    }
  }

  update_health(statuses) {
    if(statuses.twitch) {
      this.indicators.twitch.set_status("--positive", "LIVE");
    } else {
      this.indicators.twitch.set_status("--negative", "OFFLINE");
    }

    if(statuses.on_stream) {
      this.indicators.on_stream.set_status("--positive", "ON-AIR");
    } else {
      this.indicators.on_stream.set_status("--neutral", "OFF-AIR");
    }
  }

  init_socket_lifecycle_callbacks() {
    const self = this;
    this.socket.onclose = function () {
      self.indicators.server.set_status("--negative", "DEAD");
    };

    this.socket.onopen = function() {
      self.runs = self.init_runs();

      self.indicators.server.set_status("--positive", "ALIVE");
      // Sockets on heroku die after 55 seconds, so keep it alive by pinging every 15 seconds.
      function ping() { self.socket.send('{"action": "healthcheck"}'); }
      ping();
      setInterval(ping, 15 * 1000);
    }
  }

  init_runs() {
    let run_elements = document.querySelectorAll(".run[data-run-id]");
    let runs = {};
    const self = this;
    run_elements.forEach(function(element) {
      runs[element.dataset.runId] = new RunManager(element, self.socket);
    });
    return runs;
  }
}


const connection_indicator = document.querySelector(".runner-dashboard");
const dashboard = new RunnerDashboard(connection_indicator);
