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
    error() {
      assert.ok(true);
    }
  });
}

test('register error handler for Ember errors', function(assert) {
  assert.expect(1);
  this.appInstance.register('service:rollbar', createRollbarMock(assert))
  initialize(this.appInstance);
  Ember.onerror();
});

test('error handler does not override previous hook', function(assert) {
  assert.expect(2);
  this.appInstance.register('service:rollbar', createRollbarMock(assert))

  Ember.onerror = function() {
    assert.ok(true);
  }

  initialize(this.appInstance);
  Ember.onerror();
});
