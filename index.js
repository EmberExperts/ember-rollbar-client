/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-rollbar-client',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-rollbar-client/rollbar/rollbar.named-amd.js');
  },

  rollbarPath: function() {
    return path.join(this.app.project.nodeModulesPath, 'rollbar-browser', 'dist');
  },

  treeForVendor: function(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.rollbarPath(), {
      destDir: 'ember-rollbar-client/rollbar',
      files: ['rollbar.named-amd.js']
    }));

    return mergeTrees(trees);
  },

  includedCommands: function() {
    return {
      'upload-sourcemaps': require('./lib/commands/upload-sourcemaps')
    };
  }
};
