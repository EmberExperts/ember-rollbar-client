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
});

test('config: rollbar passes arguments to checkIgnore callback', function (assert) {
  assert.expect(3);

  let service = this.subject({
    config: {
      enabled: true,
      checkIgnore: function(isUnchaught, args, payload) {
        assert.equal(false, isUnchaught);
        assert.deepEqual(args[0], {
          msg: 'error',
          code: 1
        });
        assert.ok(payload);
        return true;
      }
    }
  });
  service.error({
    msg: 'error',
    code: 1
  });
})
