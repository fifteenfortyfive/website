# MCSN

This repository contains all of the services used to run [mcsn.gg](https://mcsn.gg), a website built around speedrunning events, handling event planning, runner histories, real-time run management, and more.

It is intended to be a fully-powered service for running an event, including everything from initial planning and marketing, to signups, scheduling, and real-time data for presentation on the site itself as well as any consumers (such as stream layouts or other services) that may be interested.

This repository is set up such the each service is built as an independent project, with no directly-shared resources. The only service that interacts with others directly is `mcsn_supervisor`, which manages all orchestration of services talking to each other. Each service could be taken into its own repository and run completely separate from any other without needing any additional configuration.

# Development

If you want to run this repository locally on your own to test it out, contribute to its development, or even run your own production instance, you'll want to check out the `mcsn_supervisor` directory, which has instructions on how to get up and running with everything.

The other services (folders whose names that start with `mcsn_`) describe how to run them individually and the purpose they serve, but not how they orchestrate together.

TBD: An architectural overview of how everything fits together and why things are separated the way they are.

# Deployment

The process of creating a full production deployment (at least of the API service) is provided in `mcsn_api/README.md`. To summarize, this project uses Ansible to provision servers with appropriate permissions, firewalls, and user accounts to build and run generic services. It does _not yet_ create specialized servers for difference services.
