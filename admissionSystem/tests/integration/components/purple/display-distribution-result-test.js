import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purple/display-distribution-result', 'Integration | Component | purple/display distribution result', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{purple/display-distribution-result}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#purple/display-distribution-result}}
      template block text
    {{/purple/display-distribution-result}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
