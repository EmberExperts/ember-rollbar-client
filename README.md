<p align="center">
  <img src="https://raw.githubusercontent.com/Exelord/ember-rollbar-client/master/logo.png" alt="Ember Rollbar Client Logo" width="100%">

  <a href='https://travis-ci.org/Exelord/ember-rollbar-client'><img src="https://travis-ci.org/Exelord/ember-rollbar-client.svg?branch=master" alt="Dependency Status" /></a> <a href='https://gemnasium.com/github.com/Exelord/ember-rollbar-client'><img src="https://gemnasium.com/badges/github.com/Exelord/ember-rollbar-client.svg" alt="Dependency Status" /></a>
  <a href='https://gitter.im/Exelord/ember-rollbar-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge'><img src="https://badges.gitter.im/Exelord/ember-rollbar-client.svg" alt="Gitter" /></a>
</p>

___
The Rollbar client for EmberJS applications.
> This one just works!

# Getting started

## Instalation
1. `ember install ember-rollbar-client`
2. Add your `accessToken` in `config/environment.js`
```js
  module.exports = function(environment) {
    var ENV = {
      'emberRollbarClient': {
        accessToken: 'rollbar-write-client-token',
        // By default Rollbar logging is enabled in every environment.
        // Here is an example if you want to use it only in production
        enabled: environment === 'production'
      };
    };

    return ENV;
  }
```

## Usage

### Rollbar Service
In your component, controller, route, object (or whatever) you can inject the `rollbar` service, eg:

```js
import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({
  rollbar: inject.service()
});
```

And then you can use following API to log errors:
```js
this.get('rollbar').critical(message, data = {})
this.get('rollbar').error(message, data = {})
this.get('rollbar').warning(message, data = {})
this.get('rollbar').info(message, data = {})
this.get('rollbar').debug(message, data = {})
```

### Set current user
To set current user use just a normal setter in your session service:

```js
this.set('rollbar.currentUser', { email: 'user@email.com', id: 66 })
```

### Access current notifier
If you can not find in our API a proper wrapper, you can always use the current Rollbar instance:
```js
this.get('rollbar.notifier')
```

### Create new Rollbar instance
You can use `rollbarClient` function of the `Rollbar Service` to create a new instance of Rollbar notifier. Optionally you can pass your own config.

```js
this.get('rollbar').rollbarClient(/* config */)
```

## Configuration
You can overwrite Rollbar configuration in environment's config. Here is the default config:

``` js
'emberRollbarClient': {
  enabled: true,
  accessToken: '',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: environment,
    client: {
      javascript: {
        source_map_enabled: true,
        guess_uncaught_frames: true
        // code_version: "some version string"
      }
    }
  }
};
```

# Contributing

## Installation

* `git clone https://github.com/Exelord/ember-rollbar-client`
* `cd ember-rollbar-client`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

# License

This version of the package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
