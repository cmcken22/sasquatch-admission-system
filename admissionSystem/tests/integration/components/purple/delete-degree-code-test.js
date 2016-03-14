import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purple/delete-degree-code', 'Integration | Component | purple/delete degree code', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{purple/delete-degree-code}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#purple/delete-degree-code}}
      template block text
    {{/purple/delete-degree-code}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
