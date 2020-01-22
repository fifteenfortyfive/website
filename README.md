# MCSN Services

This repository contains all of the sources powering the website for [MCSN](mcsn.gg). This does _not_ include stream layouts or any other software developed for various MCSN events. Those will be made available on an individual basis as separate repositories under this GitHub organization.

If you have any questions or would like to help contribute, please contact us at contact@fifteenfortyfive.org, or in [our community Discord server](https://discord.fifteenfortyfive.org).

#### Contributing

If you would like to contribute to this project, check out [CONTRIBUTING.md](./CONTRIBUTING.md) for an introduction.

## Running locally

To run the application locally, you will need:

- A postgres database
- Crystal 0.32.1 (check `.tool-versions` for the most up to date version)
- NodeJS 8.9.4 (check `.tool-versions` for the most up to date version)
- The `yarn` package manager.

It is recommended to use `asdf` for managing Crystal and Node versions, as they will automatically be selected based on the `.tool-versions` file.

If this is your first time using Crystal for development, you may run into issues when compiling where external libraries can't be found. Check [here](https://github.com/crystal-lang/crystal/wiki/All-required-libraries) for information about what libraries are needed for your platform.

### Building

After cloning this repository and ensuring that all dependencies above are satisfied, create a `.env` file based on the provided `.env.example`:

- `DATABASE_URL` should be the full `postgres://` url of your created database (including username/password).
- `PORT` is the port you want the application to run on
- `TWITCH_CLIENT_ID` is for loading stream information. You can generate a token from Twitch's developer portal as a new application. It is not necessary for the site to run.
- `ASSETS_*` are the S3-compliant configurations for storing user assets (avatars, etc.). This is only required if you need are developing features with avatars, icons, or other dynamic images.

With the `.env` file set up, you should be able to run `shards build` to build the application. This application is also configured to work with [`sentry`](https://github.com/samueleaton/sentry) for live-reloading changes.

To compile the assets, move to the `assets` folder and run `yarn build`. You can also run `yarn watch` to have the assets recompiled every time a file change is detected.

### Database setup

Database migrations are done using the `tool` executable. You can build it with `shards build tool`. To run migrations, use `./bin/tool db:migrate`.

**The database migrations are not currently set up to build a complete database from scratch. Efforts to fix this are greatly appreciated.**

### Running

Start the web server with `./bin/mcsn` (or `sentry` if you're using it), then go to `localhost:<PORT>` (where `PORT` is what you configured in `.env`) to see the site.

If you're using `sentry`, the server will auto-restart every time you make changes to the backend code. Otherwise, you'll need to re-build and re-run it whenever you want to see changes.

The frontend is now written entirely in React, so to see anything on the site, you'll need to have run `yarn build`, or have `yarn watch` running from the `assets` folder to have live-reloaded changes.
