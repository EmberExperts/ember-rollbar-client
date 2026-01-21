import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import Service from '@ember/service';
import deepMerge from 'lodash.merge';
import Rollbar from 'rollbar';

export default Service.extend({
  enabled: computed({
    get() {
      return this.get('config.enabled');
    },

    set(key, value) {
      this.get('notifier').configure({ enabled: value });
      return value;
    }
  }),

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
    let config = deepMerge({}, this.get('config'), customConfig);
    return new Rollbar(config);
  },

  // Notifications

  critical(...args) {
    return this.get('notifier').critical(...args);
  },

  error(...args) {
    return this.get('notifier').error(...args);
  },

  warning(...args) {
    return this.get('notifier').warning(...args);
  },

  info(...args) {
    return this.get('notifier').info(...args);
  },

  debug(...args) {
    return this.get('notifier').debug(...args);
  },

  captureEvent(...args) {
    return this.get('notifier').captureEvent(...args);
  }
});
