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
});

test('registers rollbar in error logger', function(assert) {
  assert.expect(4);

  Ember.Logger.error = function(message) {
    assert.ok(true);
    assert.equal(message, 'error');
  };

  this.appInstance.register('service:rollbar', createRollbarMock(assert, {
    error(message) {
      assert.ok(true);
      assert.equal(message, 'error');
    }
  }));

  initialize(this.appInstance);

  Ember.Logger.error('error');
});

test('registers rollbar in debug logger', function(assert) {
  assert.expect(4);

  Ember.Logger.debug = function(message) {
    assert.ok(true);
    assert.equal(message, 'debug');
  };

  this.appInstance.register('service:rollbar', createRollbarMock(assert, {
    debug(message) {
      assert.ok(true);
      assert.equal(message, 'debug');
    }
  }));

  initialize(this.appInstance);
  Ember.Logger.debug('debug')
});

test('registers rollbar in info logger', function(assert) {
  assert.expect(4);

  Ember.Logger.info = function(message) {
    assert.ok(true);
    assert.equal(message, 'info');
  };

  this.appInstance.register('service:rollbar', createRollbarMock(assert, {
    info(message) {
      assert.ok(true);
      assert.equal(message, 'info');
    }
  }));

  initialize(this.appInstance);

  Ember.Logger.info('info')
});

test('registers rollbar in warn logger', function(assert) {
  assert.expect(4);

  Ember.Logger.warn = function(message) {
    assert.ok(true);
    assert.equal(message, 'warn');
  };

  this.appInstance.register('service:rollbar', createRollbarMock(assert, {
    warning(message) {
      assert.ok(true);
      assert.equal(message, 'warn');
    }
  }));

  initialize(this.appInstance);

  Ember.Logger.warn('warn')
});

test('registers rollbar in assert logger', function(assert) {
  assert.expect(4);

  Ember.Logger.assert = function(message, bool) {
    assert.notOk(bool);
    assert.equal(message, 'assert');
  };

  this.appInstance.register('service:rollbar', createRollbarMock(assert, {
    error(message) {
      assert.ok(true);
      assert.equal(message, 'assert');
    }
  }));

  initialize(this.appInstance);

  Ember.Logger.assert('assert', false)
});
