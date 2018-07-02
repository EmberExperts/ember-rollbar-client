'use strict';

module.exports = {
  name: 'ember-rollbar-client',

  included: function(app) {
    this._super.included(app);
    app.import('node_modules/rollbar/dist/rollbar.named-amd.js')
  },

  includedCommands: function() {
    return {
      'notify-rollbar-sourcemaps': require('./lib/commands/notify-rollbar-sourcemaps')
    };
  }
};
