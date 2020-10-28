import Rollbar from "rollbar";
import Ember from 'ember';

let notifier;
let oldOnError;

export function startRollbar(config = {}) {
  notifier = new Rollbar({...config, ...{
    captureUnhandledRejections: typeof FastBoot === 'undefined'
  }})

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
  notifier = undefined
  Ember.onerror = oldOnError;
}

export {
  notifier as rollbar,
  Rollbar
}
