import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

import Ember from 'ember';
import Rollbar from 'rollbar';
import { resetOnerror } from '@ember/test-helpers';
import { rollbar, installRollbar } from 'ember-rollbar-client';

module('Unit | Rollbar', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    resetOnerror();
  });

  test('it starts rollbar', function(assert) {
    installRollbar(new Rollbar({ enabled: false, accessToken: 'test' }));
    assert.strictEqual(rollbar.options.accessToken, 'test');
  });

  test('it reports ember errors', function(assert) {
    installRollbar(new Rollbar({ enabled: false }));

    const stub = sinon.stub(rollbar, 'error');

    assert.throws(() => Ember.onerror('test'));
    assert.ok(stub.calledOnceWithExactly('test'));
  });
});
