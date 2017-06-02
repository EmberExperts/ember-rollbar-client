import Ember from 'ember';
import Rollbar from 'rollbar';

export default Ember.Service.extend({
  enabled: true,
  currentUser: null,

  notifier: Ember.computed(function() {
    return this.rollbarClient();
  }),

  rollbarClient(customConfig = {}) {
    let appConfig = this._appConfig().emberRollbarClient || {};
    let config = Ember.assign(this._defaultConfig(), appConfig, customConfig);

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

  // Private

  _defaultConfig() {
    return {
      enabled: this.get('enabled'),
      accessToken: '',
      captureUncaught: this._environment() !== 'test',
      captureUnhandledRejections: this._environment() !== 'test',
      payload: {
        environment: this._environment(),
        client: {
          javascript: {
            source_map_enabled: true,
            // code_version: "some version string, such as a version number or git sha",
            // Optionally have Rollbar guess which frames the error was thrown from
            // when the browser does not provide line and column numbers.
            guess_uncaught_frames: true
          }
        }
      }
    };
  },

  _environment() {
    return this._appConfig().environment;
  },

  _appConfig() {
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }
});
