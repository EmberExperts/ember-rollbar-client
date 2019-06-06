import Ember from 'ember';

export function initialize(appInstance) {
  let fastbootService = appInstance.lookup('service:fastboot');
  let rollbarService = appInstance.lookup('service:rollbar');

  Ember.onerror = (...args) => {
    let enabled = rollbarService.get('enabled');

    if (enabled) {
      rollbarService.error(...args);
    }

    if (!enabled || Ember.testing) {
      if (!fastbootService || !fastbootService.get('isFastBoot')) {
        throw args[0];
      }
    }
  };
}

export default { initialize };
