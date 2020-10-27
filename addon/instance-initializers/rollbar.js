import Ember from 'ember';

export function initialize(appInstance) {
  let fastbootService = appInstance.lookup('service:fastboot');
  let rollbarService = appInstance.lookup('service:rollbar');
  let oldOnError = Ember.onerror || function() {};

  Ember.onerror = (...args) => {
    oldOnError(...args);
    let enabled = rollbarService.enabled;

    if (enabled) {
      rollbarService.error(...args);
    }

    if (!enabled || Ember.testing) {
      if (!fastbootService || !fastbootService.isFastBoot) {
        throw args[0];
      }
    }
  };
}

export default { initialize };
