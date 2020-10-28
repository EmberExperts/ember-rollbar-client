import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { rollbar, startRollbar, stopRollbar } from 'ember-rollbar-client';

import Ember from 'ember';
import sinon from 'sinon';

module('Unit | Rollbar', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stopRollbar();
  });

  test('it starts rollbar', function(assert) {
    startRollbar({ enabled: false, accessToken: 'test' });
    assert.strictEqual(rollbar.options.accessToken, 'test');
  });

  test('it reports ember errors', function(assert) {
    startRollbar({ enabled: false });

    const stub = sinon.stub(rollbar, 'error');

    assert.throws(() => Ember.onerror('test'));
    assert.ok(stub.calledOnceWithExactly('test'));
  });
});
