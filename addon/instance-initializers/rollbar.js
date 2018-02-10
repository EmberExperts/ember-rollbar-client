import Ember from 'ember';

function registerRollbarOnError(rollbarService) {
  let onError = Ember.onerror;

  Ember.onerror = (...args) => {
    if (typeof onError === 'function') {
      onError(...args);
    }

    let enabled = rollbarService.get('enabled');

    if (enabled) {
      rollbarService.error(...args);
    }

    if (!enabled || Ember.testing) {
      throw args[0];
    }
  };
}

function registerRollbarInLoggers(rollbarService) {
  let { assert, debug, error, info, warn } = Ember.Logger;

  Ember.Logger.assert = (...args) => {
    rollbarService.error(...args);
    assert(...args);
  }

  Ember.Logger.debug = (...args) => {
    rollbarService.debug(...args);
    debug(...args);
  }

  Ember.Logger.error = (...args) => {
    rollbarService.error(...args);
    error(...args);
  }

  Ember.Logger.info = (...args) => {
    rollbarService.info(...args);
    info(...args);
  }

  Ember.Logger.warn = (...args) => {
    rollbarService.warning(...args);
    warn(...args);
  }
}

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');

  registerRollbarOnError(rollbarService);
  registerRollbarInLoggers(rollbarService);
}

export default { initialize };
