# mcsn_services

A tool for manging dependencies, builds, and processes for all of the services run by MCSN. This project builds and maintains an `mcsn` executable that you can run from anywhere.

```shell
# Bootstrap dependencies
mcsn bootstrap
# Start all of the services needed to get the main site running
mcsn start basic
```

# Installation

This project is written in Python with a virtual environment set up to isolate its dependencies and keep your system clean. The only required tooling outside of this project is [`asdf`](https://asdf-vm.com), a language-agnostic version manager used across this repository for managing tool versions (e.g., Python, Crystal, Node) for each project independently.

An `initialize` script is provided at `./scripts/initialize` to automatically ensure that asdf is set up correctly, install the tools necessary for running this project, and creating the virtual environment with requirements installed.

```
./scripts/initialize
```

_This installation should be entirely local. It should not make any changes to your system outside of this directory, with the exception of the python install through `asdf`._

# Usage

In development mode, every service is run in a way that automatically builds and reloads files as they change. To start local development, Boot the supervisor by running `supervisord` with the dev configuration:

```
./.venv/bin/supervisord -c ./supervisord.dev.conf
```

Verify that the supervisor has started by running `supervisorctl`. If it loads an `mcsn_supervisorctl` prompt, then supervisord has started successfully.

You can also see the current status of, start, restart, and inspect all services that the supervisor can manage at http://127.0.0.1:9001/.

To bring up the basic services and get the site running, you can either run `start mcsn_basic:*` in the `supervisorctl` terminal prompt, or manually start the services starting with `mcsn_basic:` from the web interface.

Once the services have started and say `RUNNING`, you should be able to load the app at `http://localhost:8000` (assuming default configuration).

To bring everything down when you're not working on this project, you can either just shutdown all of the services via `superviserctl stop all` or `Stop All` on the web interface, or you can completely shutdown the supervisord instance (if, say, you need to use another supervisor instance on another project) with `supervisorctl shutdown`.

# Details

`mcsn` consists of a few main parts:

- a bespoke dependency and build management system.
- a wrapper around `supervisord` for managing running services.

# Steps

### `bootstrap`

### `build`

### `start`
