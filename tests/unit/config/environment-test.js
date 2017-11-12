import { getOwner } from '@ember/application';
import { moduleFor, test } from 'ember-qunit';

moduleFor('config:environment', 'Unit | Config | environment', {
  subject() {
    return getOwner(this).resolveRegistration('config:environment');
  }
});

test('code_version has been set correctly', function(assert) {
  let versionRegexp = new RegExp(/^(.+)\+(.{7})$/);
  let codeVersion = this.subject().emberRollbarClient.payload.client.javascript['code_version'];

  assert.ok(versionRegexp.test(codeVersion));
});
