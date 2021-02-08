import Ember from 'ember';

let oldOnError = Ember.onerror;

export let rollbar = null;

export function installRollbar(rollbarInstance) {
  if (rollbar) {
    rollbar = rollbarInstance;
    return;
  }

  rollbar = rollbarInstance;
  oldOnError = Ember.onerror

  Ember.onerror = (...args) => {
    const error = args[0];

    rollbar.error(error);

    if (typeof oldOnError === 'function') {
      oldOnError(...args);
    } else if (!rollbar.options.enabled || Ember.testing) {
      throw error;
    }
  };
}

export function uninstallRollbar() {
  rollbar = null;

  Ember.onerror = oldOnError;
}
