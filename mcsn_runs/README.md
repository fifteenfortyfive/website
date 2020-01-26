# `mcsn_runs`

Runs is a real-time service for managing various kinds of speedruns. It aims to:

- Be fast and accurate enough to be a reliable timer for regular runs.
- Be scalable enough to handle any number of concurrent runs.
- Be flexible enough to support races, relays, bingos, and more.

This service also manages a websocket service for users to directly connect to and receive updates in real time.

# Install

### MCSN CLI

This is the easiest and preferred way to get things installed.

```
mcsn bootstrap
mcsn runs deps
```

### Manual

```
asdf install
mix deps.get
mix ecto.setup
```

# Running

### MCSN CLI

To run this service in your terminal, just run `mcsn runs start`, which will start the Phoenix server along with the rest of the application.

```
mcsn runs start
```

### Supervisor

To run this service as a daemon with others (i.e., while working on `mcsn_api` and interacting with runs), use supervisorctl. From the command line, run:

```
supervisorctl mcsn_aux:mcsn_runs start
```

### Manual

To start your Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:3214`](http://localhost:3214) from your browser.

# Learn more

- Official website: http://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Mailing list: http://groups.google.com/group/phoenix-talk
- Source: https://github.com/phoenixframework/phoenix
