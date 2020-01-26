# config

This directory is a _reference_ for configuration that orchestrates the various services in this repo. In other words, it's a list of which ports and hostnames different services bind to so that you can find them all in one place.

Notably, this is _not_ the source of truth that services read from. They are expected to conform to these values and be kept in sync, but since it is not programmatic, that is not guaranteed.

Some additional configuration may end up here as well as things develop.

# Services

### `mcsn_api`

##### Local development:

| property     | value                              |
| ------------ | ---------------------------------- |
| hostname     | http://localhost:3000              |
| DATABASE_URL | postgres://mcsn@localhost/mcsn_api |

##### Production example

| property     | value                                       |
| ------------ | ------------------------------------------- |
| hostname     | https://api.mcsn.gg                         |
| DATABASE_URL | postgres://mcsn:password@127.0.0.1/mcsn_api |

### `mcsn_web`

##### Local development

| property | value                 |
| -------- | --------------------- |
| hostname | http://localhost:8080 |

##### Production example

| property | value           |
| -------- | --------------- |
| hostname | https://mcsn.gg |
