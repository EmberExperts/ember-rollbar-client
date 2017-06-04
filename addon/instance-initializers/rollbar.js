import Ember from 'ember';

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');

  Ember.onerror = (error) => rollbarService.error(error);

  Ember.RSVP.on('error', (error) => {
    if (error && error.message === 'TransitionAborted') {
      return;
    }

    rollbarService.error(error)
  });
}

export default {
  name: 'rollbar',
  initialize
};
