import Rollbar from "rollbar";
import Ember from 'ember';

let notifier;

function startRollbar(config = {}) {
  notifier = new Rollbar({...config, ...{
    captureUnhandledRejections: typeof FastBoot === 'undefined'
  }})

  let oldOnError = Ember.onerror

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

export default notifier;
export { Rollbar, startRollbar };
