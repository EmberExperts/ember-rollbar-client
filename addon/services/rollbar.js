import Ember from 'ember';
import Rollbar from 'rollbar';

export default Ember.Service.extend({
  currentUser: null,
  enabled: Ember.computed.readOnly('config.enabled'),

  notifier: Ember.computed(function() {
    return this.rollbarClient();
  }),

  config: Ember.computed(function() {
    const applicationConfig = Ember.getOwner(this).resolveRegistration('config:environment');
    const code_version = applicationConfig.APP.version;
    const userConfig = applicationConfig.emberRollbarClient;
    if ( !userConfig.payload.client.javascript.code_version ) {
      userConfig.payload.client.javascript.code_version = code_version;
    }
    return userConfig;
  }),

  rollbarClient(customConfig = {}) {
    const config = Ember.assign(this.get('config'), customConfig);
    return new Rollbar(config);
  },

  // Observers

  currentUserChanged: Ember.observer('currentUser', function() {
    return this.get('notifier').configure({ payload: { person: this.get('currentUser') } });
  }),

  enabledChanged: Ember.observer('enabled', function() {
    return this.get('notifier').configure({ enabled: this.get('enabled') });
  }),

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
  },

  registerLogger() {
    if (this.get('enabled')) {
      let oldOnError = Ember.onerror || function() {};

      Ember.onerror = (...args) => {
        oldOnError(...args);
        this.error(...args);
      };
    }
  }
});
