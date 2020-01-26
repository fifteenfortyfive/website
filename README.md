# MCSN

This repository contains all of the services used to run [mcsn.gg](https://mcsn.gg), a website built around speedrunning events, handling event planning, runner histories, real-time run management, and more.

It is intended to be a fully-powered service for running an event, including everything from initial planning and marketing, to signups, scheduling, and real-time data for presentation on the site itself as well as any consumers (such as stream layouts or other services) that may be interested.

This repository is set up such the each service is built as an independent project, with no directly-shared resources. The only service that interacts with others directly is `mcsn_cli`, which manages all orchestration of services talking to each other. Each service could be taken into its own repository and run completely separate from any other without needing any additional configuration.

# Development

If you want to run this repository locally on your own to test it out, contribute to its development, or even run your own production instance, you'll want to check out the `mcsn_cli` directory, which has instructions on how to get up and running with everything.

The other services (folders whose names that start with `mcsn_`) describe how to run them individually and the purpose they serve, but not how they orchestrate together.

**MCSN does not directly support development on Windows.** This is partly due to language constraints (Crystal does not support Windows as of yet), and partly because multi-platform development support is too much added complexity for something that wouldn't be supported for production deployment anyway.

## Prerequisites

MCSN relies on a few tools across all of its projects. To avoid forcing any kind of devops philosophy on your system, it is not installed automatically and is instead expected to be installed manually by you before starting development.

### `asdf-vm`

[`asdf-vm`](https://asdf-vm.com) is a manager for version managers. There are plenty of tools out there for managing different versions of programming languages, like `rbenv` for Ruby, `nvm` for Node, and `pyenv` for Python, to name a few. `asdf` is a CLI tool that brings all of those other tools together and provides a consistent interface for working with them.

Using `asdf`, MCSN does not have to rely on any system executables and can stay completely in userland, even when installing and upgrading global binaries.

Instructions for how to install `asdf` can be found [here](https://asdf-vm.com/#/core-manage-asdf-vm).

##### Installation Notes

Using the `mcsn bootstrap` command will install asdf plugins as needed to ensure that everything needed for installing dependencies will succeed. These include `crystal`, and `nodejs` (maybe others if this is out of date). It will first check if these plugins are already installed and only attempt to install them if they are not currently available.

Importantly, `nodejs` is frustrating and requires importing custom gpg keys to have simple version management. This is [configurable](https://github.com/asdf-vm/asdf-nodejs#use), so if you are concerned by this, install the `nodejs` plugin first (or another plugin in place of it) and the bootstrap will not have to do anything.

### `yarn`

[`yarn`]() is an alternative package manager for javascript projects, taking the place of `npm` when used. MCSN chooses to use yarn for its ergonomics. While not necessarily better than `npm`, its clarity and consistency in the terminal is appreciated.

Instructions for how to install `yarn` can be found [here](https://legacy.yarnpkg.com/lang/en/docs/install/).

### Postgres

MCSN uses Postgres for all of its persistent data storage. Because Postgres is so ubiquitous and is generally an "always-running" process on developer's machines, MCSN will not try to install and/or manage postgres, and it will just be expected to be running whenever working on MCSN services.

As of now, any officially-supported version of Postgres should be sufficient, but as always, being on the latest version is best.

Instructions for how to install `postgres` can be found [here](https://www.postgresql.org/download/)

## TBD

An architectural overview of how everything fits together and why things are separated the way they are.

# Deployment

The process of creating a full production deployment (at least of the API service) is provided in `mcsn_api/README.md`. To summarize, this project uses Ansible to provision servers with appropriate permissions, firewalls, and user accounts to build and run generic services. It does _not yet_ create specialized servers for difference services.
