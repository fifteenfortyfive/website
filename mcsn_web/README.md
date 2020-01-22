# Build assets

echo ">> compiling assets"
(cd assets && yarn && yarn build)

# Install Yarn

We use `yarn` as the package manager for assets. You can use npm, but yarn is much preferred. To install `yarn` on the server, use [this guide](https://yarnpkg.com/en/docs/install). Or, if you're on Ubuntu, use the following commands (you'll need to be a root user, as before):

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn
```
