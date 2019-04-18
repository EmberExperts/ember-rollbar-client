<p align="center">
  <img src="https://raw.githubusercontent.com/Exelord/ember-rollbar-client/master/logo.png" alt="Ember Rollbar Client Logo" width="100%">

  <a href='https://travis-ci.org/Exelord/ember-rollbar-client'>
    <img src="https://travis-ci.org/Exelord/ember-rollbar-client.svg?branch=master" alt="Dependency Status" />
  </a>

  <a href="https://david-dm.org/exelord/ember-rollbar-client" title="dependencies status">
    <img src="https://david-dm.org/exelord/ember-rollbar-client/status.svg"/>
  </a>

  <a href='https://gitter.im/Exelord/ember-rollbar-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge'>
    <img src="https://badges.gitter.im/Exelord/ember-rollbar-client.svg" alt="Gitter" />
  </a>
</p>

___
The Rollbar client for EmberJS applications.
> This one just works!

- Automatic logger for:
  - `js window` errors
  - `ember` errors
- No `Bower` dependency
- Fastboot compatible
- Practical wrapper with access to pure `Rollbar`
- Compatible with Ember 2.8 and up

## Compatibility

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

## Installation

1. `ember install ember-rollbar-client`
2. Add your `accessToken` in `config/environment.js`
```js
  module.exports = function(environment) {
    var ENV = {
      emberRollbarClient: {
        accessToken: 'rollbar-write-client-token',
        // By default Rollbar logging is enabled in every environment except test and development.
        // Here is an example if you want to use it only in production
        enabled: environment === 'production'
      }
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

### Support error handling from RSVP
Create the following instance initializer in your app:

```js
// app/instance-initializer/rsvp-error-handler.js
import RSVP from "rsvp";

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');

  RSVP.on('error', function(reason) {
    rollbarService.error(reason);
  });
}

export default {
  name: 'rsvp-error-handler',
  initialize
};
```

### Create new Rollbar instance
You can use `rollbarClient` function of the `Rollbar Service` to create a new instance of Rollbar notifier. Optionally you can pass your own config.

```js
this.get('rollbar').rollbarClient(/* config */)
```

### Support code_version on Heroku build
Add at the bottom of your `config/environment.js` file:
```js
// Heroku Git Hash support
if (process.env.SOURCE_VERSION) {
  let packageJson = require('../package.json');
  let gitHash = process.env.SOURCE_VERSION.substr(0, 7);
  ENV.emberRollbarClient.payload.client.javascript['code_version'] = `${packageJson.version}+${gitHash}`;
}
```

### Configuration
You can overwrite Rollbar configuration in environment's config. Here is the default config:

``` js
'emberRollbarClient': {
  enabled: environment !== 'test' && environment !== 'development',
  accessToken: '',
  verbose: true,
  captureUncaught: environment !== 'test',
  captureUnhandledRejections: environment !== 'test',
  payload: {
    environment: environment,
    client: {
      javascript: {
        source_map_enabled: true,
        guess_uncaught_frames: true
        code_version: "YOUR_APP_VERSION" // returns app version in format: 2.4.0+06df23a
        // leave empty to use application version which is a default value
      }
    }
  }
};
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
