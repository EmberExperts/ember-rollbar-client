import Ember from 'ember';

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');
  let oldOnError = Ember.onerror || function() {};

  Ember.onerror = (...args) => {
    oldOnError(...args);

    if (rollbarService.get('enabled')) {
      rollbarService.error(...args);
    }
  };
}

export default {
  name: 'rollbar',
  initialize
};
