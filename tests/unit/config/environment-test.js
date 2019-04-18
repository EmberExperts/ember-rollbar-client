import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Config | environment', function(hooks) {
  setupTest(hooks);

  test('code_version has been set correctly', function(assert) {
    let versionRegexp = new RegExp(/^(.+)\+(.{7})$/);
    let config = this.owner.resolveRegistration('config:environment');
    let codeVersion = config.emberRollbarClient.payload.client.javascript['code_version'];

    assert.ok(versionRegexp.test(codeVersion));
  });
});
