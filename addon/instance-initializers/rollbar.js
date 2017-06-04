import Ember from 'ember';

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');
  let oldOnError = Ember.onerror || function() {};

  Ember.onerror = () => {
    oldOnError(...arguments);
    rollbarService.error(...arguments);
  };
}

export default {
  name: 'rollbar',
  initialize
};
