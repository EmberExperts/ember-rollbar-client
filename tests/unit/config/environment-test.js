import { getOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Config | environment', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.subject = function() {
      return this.owner.resolveRegistration('config:environment');
    };
  });

  test('code_version has been set correctly', function(assert) {
    let versionRegexp = new RegExp(/^(.+)\+(.{7})$/);
    let codeVersion = this.subject().emberRollbarClient.payload.client.javascript['code_version'];

    assert.ok(versionRegexp.test(codeVersion));
  });
});
