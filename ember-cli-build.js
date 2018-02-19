'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let config = defaults.project.config(EmberAddon.env());

  let app = new EmberAddon(defaults, {
    sourcemaps: { enabled: true },

    babel: {
      sourceMaps: 'inline'
    },

    sassOptions: {
      extension: 'sass',
    },

    fingerprint: {
      exclude: ['apple-touch-icon', 'favicon', 'mstile']
    },

    favicons: {
      faviconsConfig: {
        appName: 'Ember Rollbar Client',
        appDescription: 'Ember Rollbar Client is a wrapper of automatic Rollbar logger for EmberJS applications.',
        developerName: 'Exelord',
        developerURL: 'www.macsour.com',
        background: '#ffffff',
        path: config.rootURL,  // Path for overriding default icons path. `string`
        url: 'https://exelord.github.io/ember-rollbar-client/images/og-image.jpg',  // Absolute URL for OpenGraph image. `string`
      }
    },

    'ember-bootstrap': {
      bootstrapVersion: 3,
      importBootstrapFont: true,
      importBootstrapCSS:false
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
