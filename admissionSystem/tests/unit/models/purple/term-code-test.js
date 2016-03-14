import { moduleForModel, test } from 'ember-qunit';

moduleForModel('purple/term-code', 'Unit | Model | purple/term code', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
