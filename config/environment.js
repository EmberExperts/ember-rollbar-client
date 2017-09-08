/* eslint-env node */
'use strict';

const git = require('git-rev-sync')

function gitCommit() {
  try {
    return git.long();
  } catch (e) {
    // returns undefined
  }
}

module.exports = function(environment, appConfig) {
  appConfig.emberRollbarClient = {
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
          code_version: gitCommit(),
          guess_uncaught_frames: true
        }
      }
    }
  };
};
