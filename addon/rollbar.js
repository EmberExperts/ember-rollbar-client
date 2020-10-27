import Rollbar from "rollbar";
import Ember from 'ember';

let notifier;

function startRollbar(config = {}) {
  notifier = new Rollbar(config);

  let oldOnError = Ember.onerror

  Ember.onerror = (...args) => {
    if (notifier) notifier.error(args[0]);

    if (typeof oldOnError === 'function') {
      oldOnError(...args);
    } else if (Ember.testing) {
      throw args[0];
    }
  };

  return notifier;
}

export default notifier;
export { Rollbar, startRollbar };
