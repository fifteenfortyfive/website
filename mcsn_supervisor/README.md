# mcsn_supervisor

A tool for manging dependencies, builds, and processes for all of the services run by MCSN. This project maintains an `mcsn` executable that you can run from anywhere.

## Installation

This project is written in Python with a virtual environment set up to isolate its dependencies and keep your system clean. The only required tooling outside of this project is [`asdf`](https://asdf-vm.com), a language-agnostic version manager used across this repository for managing tool versions (e.g., Python, Crystal, Node) for each project independently.

An `initialize` script is provided at `./scripts/initialize` to automatically ensure that asdf is set up correctly, install the tools necessary for running this project, and creating the virtual environment with requirements installed.

```
./scripts/initialize
```

Be sure to run this script in this directory! It relies on relative paths and the current directory to install correctly.

_This installation should be entirely local. It should not make any changes to your system outside of this directory, with the exception of the python install through `asdf`._

## Usage

_Note: currently, running the `mcsn` script does not work directly. For now, you will have to activate the virtualenv and run the script with `python mcsn.py` from this directory._

```
. ./.venv/bin/activate
python mcsn.py mcsn_api build
```

`./scripts/mcsn` is the executable script for running the management CLI. After installation, you can either execute the script directly, or symlink it onto your `PATH` to run as `mcsn` without any path prefix. The examples in this README will just use `mcsn` to refer to "running the executable". It should work the same regardless of how you invoke the script.

For a quick introduction of what's available in the CLI, run `mcsn --help`.

The general structure of the CLI is just `<service> <command>`, where `service` is the name of the service to manage, and `command` is the operation to run for that service.

For example, to `build` the `mcsn_api` service and then `start` is, just use:

```
mcsn mcsn_api build
mcsn mcsn_api start
```

Some commands accept additional arguments. You can see what's available for every command either by inspecting it's service definition in `./mcsn/services` in this project, or by simply passing `--help` to it on the command line.

# Using `supervisorctl` directly

In development mode, every service is run in a way that automatically builds and reloads files as they change. To start local development, Boot the supervisor by running `supervisord` with the dev configuration:

```
./.venv/bin/supervisord -c ./supervisord.dev.conf
```

Verify that the supervisor has started by running `supervisorctl`. If it loads an `mcsn_supervisorctl` prompt, then supervisord has started successfully.

You can also see the current status of, start, restart, and inspect all services that the supervisor can manage at http://127.0.0.1:9001/.

To bring up the basic services and get the site running, you can either run `start mcsn_basic:*` in the `supervisorctl` terminal prompt, or manually start the services starting with `mcsn_basic:` from the web interface.

Once the services have started and say `RUNNING`, you should be able to load the app at `http://localhost:8000` (assuming default configuration).

To bring everything down when you're not working on this project, you can either just shutdown all of the services via `superviserctl stop all` or `Stop All` on the web interface, or you can completely shutdown the supervisord instance (if, say, you need to use another supervisor instance on another project) with `supervisorctl shutdown`.
