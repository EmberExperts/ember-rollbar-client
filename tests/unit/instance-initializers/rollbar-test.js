import Ember from 'ember';
import EmberObject from '@ember/object';
import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/rollbar';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

function createRollbarMock(assert, options = {}) {
  return EmberObject.extend({
    enabled: true,

    error(message) {
      assert.ok(true);
      assert.equal(message, 'foo');
    }
  }, options);
}

module('Unit | Instance Initializer | rollbar', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },

  afterEach() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  },
});

test('register error handler for Ember errors', function(assert) {
  assert.expect(2);
  this.appInstance.register('service:rollbar', createRollbarMock(assert));

  initialize(this.appInstance);
  Ember.onerror('foo');
});

test('error handler does not override previous hook', function(assert) {
  assert.expect(4);
  this.appInstance.register('service:rollbar', createRollbarMock(assert));

  Ember.onerror = function(message) {
    assert.ok(true);
    assert.equal(message, 'foo');
  };

  initialize(this.appInstance);
  Ember.onerror('foo');
});

test('error handler does not fire error if disabled', function(assert) {
  assert.expect(1);
  this.appInstance.register('service:rollbar', createRollbarMock(assert, { enabled: false }));

  Ember.onerror = function() {
    assert.ok(true);
  };

  initialize(this.appInstance);
  Ember.onerror();
})
