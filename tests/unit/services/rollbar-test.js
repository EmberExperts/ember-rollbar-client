import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Rollbar from 'rollbar';

moduleFor('service:rollbar', 'Unit | Service | rollbar', {
  needs: ['config:environment']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('notifier', function(assert) {
  let service = this.subject();
  assert.ok(service.get('notifier') instanceof Rollbar);
});

test('critical', function(assert) {
  let service = this.subject();
  let uuid = service.critical('My error message').uuid;
  assert.ok(uuid);
});

test('error', function(assert) {
  let service = this.subject();
  let uuid = service.error('My error message').uuid;
  assert.ok(uuid);
});

test('warning', function(assert) {
  let service = this.subject();
  let uuid = service.warning('My error message').uuid;
  assert.ok(uuid);
});

test('info', function(assert) {
  let service = this.subject();
  let uuid = service.info('My error message').uuid;
  assert.ok(uuid);
});

test('debug', function(assert) {
  let service = this.subject();
  let uuid = service.debug('My error message').uuid;
  assert.ok(uuid);
});

test('config with default value for code version', function(assert) {
  let service = this.subject();
  let currentVersion = Ember.getOwner(this).resolveRegistration('config:environment').APP.version
  assert.equal(service.get('config').payload.client.javascript.code_version, currentVersion);
});

test('config custom value for code version', function(assert) {
  let emberRollbarClientConfig = Ember.getOwner(this).resolveRegistration('config:environment').emberRollbarClient;
  emberRollbarClientConfig.payload.client.javascript.code_version = '1.2.3';
  let service = this.subject();
  assert.equal(service.get('config').payload.client.javascript.code_version, '1.2.3');
});

test('registerLogger: register error handler for Ember errors if enabled', function(assert) {
  assert.expect(2);
  let service = this.subject({
    config: {
      enabled: true
    },
    error(message) {
      assert.ok(true, 'error handler is called');
      assert.equal(message, 'foo', 'error is passed to error handler as argument');
    }
  });
  service.registerLogger();
  Ember.onerror('foo');
});

test('registerLogger: does not override previous hook', function(assert) {
  assert.expect(4);
  let service = this.subject({
    config: {
      enabled: true
    },
    error(message) {
      assert.ok(true, 'rollbar error handler is called');
      assert.equal(message, 'foo', 'error is passed to rollbar error handler as argument');
    }
  });
  Ember.onerror = function(message) {
    assert.ok(true, 'previous hook is called');
    assert.equal(message, 'foo', 'error is passed to previous hook as argument');
  };
  service.registerLogger();
  Ember.onerror('foo');
});

test('registerLogger: does not register logger if disabled', function(assert) {
  assert.expect(1);
  let service = this.subject({
    config: {
      enabled: false
    },
    error() {
      assert.notOk(true);
    }
  });
  Ember.onerror = function() {
    assert.ok(true);
  };
  service.registerLogger();
  Ember.onerror();
})
