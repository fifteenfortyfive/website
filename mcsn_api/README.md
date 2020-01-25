# MCSN API

This folder defines the API service for the MCSN website. It powers all asynchronous requests, authentication, and interactions with other services provided by MCSN.

Most of the time, you'll want to be running `mcsn_web` as well to load the actual site. This service only defines a JSON API, not the React application or any other interface.

#### Contributing

If you would like to contribute to this project, check out [CONTRIBUTING.md](./CONTRIBUTING.md) for an introduction.

## Running locally

To run the application locally, you will need:

- A postgres database
- Crystal 0.32.1 (check `.tool-versions` for the most up to date version)

It is recommended to use `asdf` for managing Crystal versions, as they will automatically be selected based on the `.tool-versions` file.

If this is your first time using Crystal for development, you may run into issues when compiling where external libraries can't be found. Check [here](https://github.com/crystal-lang/crystal/wiki/All-required-libraries) for information about what libraries are needed for your platform.

### Building

After cloning this repository and ensuring that all dependencies above are satisfied, create a `.env` file based on the provided `.env.example`:

- `DATABASE_URL` should be the full `postgres://` url of your created database (including username/password).
- `PORT` is the port you want the application to run on
- `TWITCH_CLIENT_ID` is for loading stream information. You can generate a token from Twitch's developer portal as a new application. It is not necessary for the site to run.
- `ASSETS_*` are the S3-compliant configurations for storing user assets (avatars, etc.). This is only required if you need are developing features with avatars, icons, or other dynamic images.

With the `.env` file set up, you should be able to run `shards build` to build the application. This application is also configured to work with [`sentry`](https://github.com/samueleaton/sentry) for live-reloading changes.

### Database setup

Database migrations are done using the `tool` executable. You can build it with `shards build tool`. To run migrations, use `./bin/tool db:migrate`.

**The database migrations are not currently set up to build a complete database from scratch. Efforts to fix this are greatly appreciated.**

### Running

Start the web server with `./bin/mcsn` (or `sentry` if you're using it), then go to `localhost:<PORT>` (where `PORT` is what you configured in `.env`) to see the site.

If you're using `sentry`, the server will auto-restart every time you make changes to the backend code. Otherwise, you'll need to re-build and re-run it whenever you want to see changes.

The frontend is now written entirely in React, so to see anything on the site, you'll need to have run `yarn build`, or have `yarn watch` running from the `assets` folder to have live-reloaded changes.
