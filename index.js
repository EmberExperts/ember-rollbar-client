'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  importTransforms: require('ember-cli-cjs-transform').importTransforms,

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-rollbar-client/rollbar.named-amd.js');
    app.import('node_modules/lodash.merge/index.js', {
      using: [
        { transformation: 'cjs', as: 'lodash.merge' }
      ]
    });
  },

  rollbarPath: function() {
    var rollbarPath = path.dirname(this.project.resolveSync('rollbar/package.json'));
    return path.join(rollbarPath, 'dist');
  },

  treeForVendor: function() {
    let files = ['rollbar.named-amd.js'];

    if (this.app.options.sourcemaps.enabled) {
      files.push('rollbar.named-amd.js.map');
    }

    return new Funnel(this.rollbarPath(), {
      destDir: 'ember-rollbar-client',
      files,
    });
  }
};
