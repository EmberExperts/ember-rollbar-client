/* eslint-env node */
'use strict';

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
          // code_version: "some version string, such as a version number or git sha",
          // Optionally have Rollbar guess which frames the error was thrown from
          // when the browser does not provide line and column numbers.
          guess_uncaught_frames: true
        }
      }
    }
  }
};
