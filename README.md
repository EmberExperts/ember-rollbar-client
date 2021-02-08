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
The Rollbar Client is a thin layer of integration with EmberJS applications.

## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Installation

1. `npm install rollbar`
1. `ember install ember-rollbar-client`
2. Add your `accessToken` in `config/environment.js`
```js
  module.exports = function(environment) {
    var ENV = {
      rollbar: {
        accessToken: 'rollbar-write-client-token',
        // By default Rollbar logging is enabled in every environment except test and development.
        // Here is an example if you want to use it only in production
        enabled: environment === 'production'
      }
    };

    return ENV;
  }
```
3. Initialize and start the Rollbar in `/app/app.js` file:
```js
import Rollbar from 'rollbar';
import config from 'YOUR_APP/config/environment';
import { installRollbar } from 'ember-rollbar-client';

// Add this line before loadInitializers()
installRollbar(new Rollbar(config.rollbar));
```

## Usage

By default rollbar will handle automatically all uncaught errors and Ember errors. However, you can still report them manually.

Import Rollbar Notifier from anywhere and use standard Rollbar API:

```js
import { rollbar } from 'ember-rollbar-client';

rollbar.critical('Report this critical error!')
```

For available API check [Rollbar documentation](https://docs.rollbar.com/docs/javascript)

### Uninstalling Rollbar

This can be useful in tests:
```js
import { uninstallRollbar } from 'ember-rollbar-client';

uninstallRollbar();
```

### Support code_version on Heroku build
Add at the bottom of your `config/environment.js` file:
```js
// Heroku Git Hash support
if (process.env.SOURCE_VERSION) {
  let packageJson = require('../package.json');
  let gitHash = process.env.SOURCE_VERSION.substr(0, 7);
  ENV.rollbar.payload.client.javascript['code_version'] = `${packageJson.version}+${gitHash}`;
}
```

### Configuration
You can overwrite Rollbar configuration in environment's config. Here is the default config:

``` js
'rollbar': {
  enabled: environment !== 'test' && environment !== 'development',
  accessToken: '',
  verbose: true,
  captureUncaught: environment !== 'test',
  captureUnhandledRejections: environment !== 'test' // && !FastBoot,
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
