import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purple/delete-admission-rule', 'Integration | Component | purple/delete admission rule', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{purple/delete-admission-rule}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#purple/delete-admission-rule}}
      template block text
    {{/purple/delete-admission-rule}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
