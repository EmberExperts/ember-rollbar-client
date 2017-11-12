import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Service from '@ember/service';
import Rollbar from 'rollbar';
import deepMerge from 'lodash/merge';

export default Service.extend({
  enabled: reads('config.enabled'),

  currentUser: computed({
    set(key, value) {
      this.get('notifier').configure({ payload: { person: value } });
      return value;
    }
  }),

  notifier: computed(function() {
    return this.rollbarClient();
  }).readOnly(),

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberRollbarClient;
  }).readOnly(),

  rollbarClient(customConfig = {}) {
    let config = deepMerge(this.get('config'), customConfig);
    return new Rollbar(config);
  },

  // Notifications

  critical(message, data = {}) {
    return this.get('notifier').critical(message, data);
  },

  error(message, data = {}) {
    return this.get('notifier').error(message, data);
  },

  warning(message, data = {}) {
    return this.get('notifier').warning(message, data);
  },

  info(message, data = {}) {
    return this.get('notifier').info(message, data);
  },

  debug(message, data = {}) {
    return this.get('notifier').debug(message, data);
  }
});
