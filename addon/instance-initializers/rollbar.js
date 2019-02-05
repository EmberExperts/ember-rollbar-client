import Ember from 'ember';

export function initialize(appInstance) {
  let config = appInstance.resolveRegistration('config:environment')
  let fastbootService = appInstance.lookup('service:fastboot');
  let rollbarService = appInstance.lookup('service:rollbar');
  let oldOnError = Ember.onerror || function() {};
  let isTesting = config.environment === 'test';

  Ember.onerror = (...args) => {
    oldOnError(...args);
    let enabled = rollbarService.get('enabled');

    if (enabled) {
      rollbarService.error(...args);
    }

    if (!enabled || isTesting) {
      if (!fastbootService || !fastbootService.get('isFastBoot')) {
        throw args[0];
      }
    }
  };
}

export default { initialize };
