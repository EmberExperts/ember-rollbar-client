import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

import Rollbar from 'rollbar';
import config from 'dummy/config/environment';
import { installRollbar } from 'ember-rollbar-client';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

installRollbar(new Rollbar(config.rollbar));
loadInitializers(App, config.modulePrefix);
