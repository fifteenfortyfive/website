# mcsn_web

The frontend application for [mcsn.gg](https://mcsn.gg).

# Install Yarn

We use `yarn` as the package manager for assets. You can use npm, but yarn is much preferred. To install `yarn` on the server, use [this guide](https://yarnpkg.com/en/docs/install). Or, if you're on Ubuntu, use the following commands (you'll need to be a root user, as before):

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn
```

# Running locally

Install dependencies, then start the development server

```
yarn install
yarn serve
```

`yarn serve` will start a `webpack-dev-server` instance that listens on http://localhost:8080. The development server automatically watches files and recompiles the app whenever you change anything inside it.

# Running a Production server

This project also includes a production server for running an optimized build. The definition of this server lives in `server/`.

To run the production server, first build the app with `yarn build` in this directory, then cd into the server and run `yarn start`.

```
yarn build
cd server
yarn start
```

By default, this server assumes an external process supervisor for restarting the server on errors. Anytime the app is rebuilt, it will automatically start serving the new assets, but it will not automatically rebuild them when source files change.
