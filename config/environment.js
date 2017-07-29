/* eslint-env node */
'use strict';

const git = require('git-rev-sync')

module.exports = function(environment, appConfig) {
  appConfig.emberRollbarClient = {
    enabled: environment !== 'test' && environment !== 'development',
    accessToken: '',
    verbose: true,
    captureUncaught: environment !== 'test',
    captureUnhandledRejections: environment !== 'test',
    payload: {
      environment: 'okoko',
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: git.long(),
          guess_uncaught_frames: true
        }
      }
    }
  };
};
