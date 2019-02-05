import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Rollbar from 'rollbar';

module('Unit | Service | rollbar', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    assert.ok(service);
  });

  test('enabled', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    assert.equal(service.get('enabled'), false);

    service.set('enabled', true)
    assert.equal(service.get('enabled'), true);
    assert.equal(service.get('notifier.options.enabled'), true);
  });

  test('currentUser', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    assert.equal(service.get('currentUser'), null);

    let user = { name: 'User' };
    service.set('currentUser', user);
    assert.equal(service.get('currentUser'), user);
    assert.equal(service.get('notifier.options.payload.person.name'), 'User');
  });

  test('new rollbar client - deep merge config', function(assert) {
    const config = this.owner.resolveRegistration('config:environment');
    let { emberRollbarClient } = config;

    let newClient = this.owner.lookup('service:rollbar').rollbarClient({
      payload: {
        client: {
          javascript: {
            source_map_enabled: false
          }
        }
      }
    });

    assert.deepEqual(newClient.options.payload.client.javascript, {
      source_map_enabled: false,
      code_version: emberRollbarClient.payload.client.javascript.code_version,
      guess_uncaught_frames: true
    } , 'provided config is deep merged with default');
  });

  test('notifier', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    assert.ok(service.get('notifier') instanceof Rollbar);
  });

  test('critical', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    let uuid = service.critical('My error message').uuid;
    assert.ok(uuid);
  });

  test('error', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    let uuid = service.error('My error message').uuid;
    assert.ok(uuid);
  });

  test('warning', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    let uuid = service.warning('My error message').uuid;
    assert.ok(uuid);
  });

  test('info', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    let uuid = service.info('My error message').uuid;
    assert.ok(uuid);
  });

  test('debug', function(assert) {
    let service = this.owner.lookup('service:rollbar');
    let uuid = service.debug('My error message').uuid;
    assert.ok(uuid);
  });
});
