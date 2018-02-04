import Ember from 'ember';
import EmberObject from '@ember/object';
import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/rollbar';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

const onError = Ember.onerror;

function createRollbarMock(assert, options = {}) {
  return EmberObject.extend({
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
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },

  afterEach() {
    Ember.onerror = onError;
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  },
});

test('register error handler for Ember errors', function(assert) {
  assert.expect(3);
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

test('error handler does not fire error if disabled', function(assert) {
  assert.expect(2);
  let error = new Error('foo');
  this.appInstance.register('service:rollbar', createRollbarMock(assert, { enabled: false }));

  Ember.onerror = function() {
    assert.ok(true);
  };

  initialize(this.appInstance);
  assert.throws(() => Ember.onerror(error), error);
})
