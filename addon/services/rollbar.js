import { getOwner } from '@ember/application';
import Service from '@ember/service';
import deepMerge from 'lodash.merge';
import Rollbar from 'rollbar';

export default class RollbarService extends Service {
  _notifier = undefined;

  get enabled() {
    return this.notifier.options.enabled;
  }

  set enabled(value) {
    this.notifier.configure({ enabled: value });
  }

  get currentUser() {
    return this.notifier.options.payload.person;
  }

  set currentUser(value) {
    this.notifier.configure({ payload: { person: value } });
  }

  get notifier() {
    return this._notifier;
  }

  get config() {
    return getOwner(this).resolveRegistration('config:environment').emberRollbarClient;
  }

  constructor() {
    super(...arguments);
    this._notifier = this.rollbarClient();
  }

  rollbarClient(customConfig = {}) {
    let config = deepMerge({}, this.config, customConfig);
    return new Rollbar(config);
  }

  // Notifications

  critical(...args) {
    return this.notifier.critical(...args);
  }

  error(...args) {
    return this.notifier.error(...args);
  }

  warning(...args) {
    return this.notifier.warning(...args);
  }

  info(...args) {
    return this.notifier.info(...args);
  }

  debug(...args) {
    return this.notifier.debug(...args);
  }
}
