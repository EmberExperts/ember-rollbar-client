import { moduleFor, test } from 'ember-qunit';
import Rollbar from 'rollbar';

moduleFor('service:rollbar', 'Unit | Service | rollbar', {
  needs: ['config:environment'],
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
