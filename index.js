/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-rollbar-client',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-rollbar-client/rollbar.named-amd.js');
  },

  rollbarPath: function() {
    return path.join(this.app.project.nodeModulesPath, 'rollbar', 'dist');
  },

  treeForVendor: function() {
    return new Funnel(this.rollbarPath(), {
      destDir: 'ember-rollbar-client',
      files: ['rollbar.named-amd.js']
    });
  },

  includedCommands: function() {
    return {
      'automatic-source-maps': require('./lib/commands/automatic-source-maps')
    };
  }
};
