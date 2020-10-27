import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';

import { startRollbar } from 'ember-rollbar-client';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

startRollbar(config.emberRollbarClient);

loadInitializers(App, config.modulePrefix);
