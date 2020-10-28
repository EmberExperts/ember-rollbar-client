import Rollbar from "rollbar";
import Ember from 'ember';

const rollbar = new Rollbar({
  enabled: false,
  captureUnhandledRejections: typeof FastBoot === 'undefined'
});

let oldOnError;

function startRollbar(config = {}) {
  rollbar.configure({...{ enabled: true }, ...config, ...{
    captureUnhandledRejections: typeof FastBoot === 'undefined'
  }});

  oldOnError = Ember.onerror

  Ember.onerror = (...args) => {
    if (rollbar) rollbar.error(args[0]);

    if (typeof oldOnError === 'function') {
      oldOnError(...args);
    } else if (!rollbar.options.enabled ||   Ember.testing) {
      throw args[0];
    }
  };

  return rollbar;
}

function stopRollbar() {
  rollbar.options.enabled = false;
  Ember.onerror = oldOnError;
}

export {
  rollbar,
  Rollbar,
  startRollbar,
  stopRollbar
}
