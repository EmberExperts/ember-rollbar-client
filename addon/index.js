import Rollbar from "rollbar";
import Ember from 'ember';

const notifier = new Rollbar({
  enabled: false,
  captureUnhandledRejections: typeof FastBoot === 'undefined'
});

let oldOnError;

export function startRollbar(config = {}) {
  notifier.configure({...{ enabled: true }, ...config});

  oldOnError = Ember.onerror

  Ember.onerror = (...args) => {
    if (notifier) notifier.error(args[0]);

    if (typeof oldOnError === 'function') {
      oldOnError(...args);
    } else if (!notifier.options.enabled ||   Ember.testing) {
      throw args[0];
    }
  };

  return notifier;
}

export function stopRollbar() {
  notifier.options.enabled = false;
  Ember.onerror = oldOnError;
}

export {
  notifier as rollbar,
  Rollbar
}
