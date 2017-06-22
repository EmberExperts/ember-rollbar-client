import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/rollbar';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | rollbar', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  },
});

function createRollbarMock(assert) {
  return Ember.Object.extend({
    registerLogger() {
      assert.ok(true);
    }
  });
}

test('invokes registerLogger', function(assert) {
  assert.expect(1);
  this.appInstance.register('service:rollbar', createRollbarMock(assert))
  initialize(this.appInstance);
});
