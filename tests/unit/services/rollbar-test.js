import { moduleFor, test } from 'ember-qunit';
import Rollbar from 'rollbar';
import Ember from "ember";

moduleFor('service:rollbar', 'Unit | Service | rollbar', {
  needs: ['config:environment'],

  afterEach() {
    Ember.onerror = undefined;
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('enabled', function(assert) {
  let service = this.subject();
  assert.equal(service.get('enabled'), false);

  service.set('enabled', true);
  assert.equal(service.get('enabled'), true);
  assert.ok(Ember.onerror);
  assert.equal(service.get('notifier.options.enabled'), true);
});

test('currentUser', function(assert) {
  let service = this.subject();
  assert.equal(service.get('currentUser'), null);

  let user = { name: 'User' };
  service.set('currentUser', user);
  assert.equal(service.get('currentUser'), user);
  assert.equal(service.get('notifier.options.payload.person.name'), 'User');
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
