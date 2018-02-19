import { initialize } from 'ember-rollbar-client/instance-initializers/rollbar';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { getApplication } from '@ember/test-helpers/application';

import Ember from 'ember';
import Service from '@ember/service';

const onError = Ember.onerror;

function createRollbarMock(assert, options = {}) {
  return Service.extend({
    enabled: true,

    error(error) {
      assert.ok(true);
      assert.equal(error.message, 'foo');
    }
  }, options);
}

module('Unit | Instance Initializer | rollbar', {
  beforeEach() {
    run(() => {
      this.application = getApplication()
      this.appInstance = this.application.buildInstance();
    });
  },

  afterEach() {
    Ember.onerror = onError;
    run(this.appInstance, 'destroy');
  }
});

test('register error handler for Ember errors', function(assert) {
  assert.expect(3);

  Ember.onerror = onError;
  let error = new Error('foo');
  this.appInstance.register('service:rollbar', createRollbarMock(assert));

  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);
});

test('error handler does not override previous hook', function(assert) {
  assert.expect(5);
  let error = new Error('foo');
  this.appInstance.register('service:rollbar', createRollbarMock(assert));

  Ember.onerror = function(error) {
    assert.ok(true);
    assert.equal(error.message, 'foo');
  };

  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);
});

test('error handler reacts on enabled state', function(assert) {
  assert.expect(7);
  let error = new Error('foo');
  this.appInstance.register('service:rollbar', createRollbarMock(assert));

  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);

  this.appInstance.lookup('service:rollbar').set('enabled', false);
  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);

  this.appInstance.lookup('service:rollbar').set('enabled', true);
  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);
})
