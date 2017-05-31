import Ember from 'ember';

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');

  Ember.onerror = (error) => rollbarService.error(error);
  window.onerror = (error) => rollbarService.error(error);
  Ember.RSVP.on('error', (error) => rollbarService.error(error));
}

export default {
  name: 'rollbar',
  initialize
};
