import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purple/add-logical-expression', 'Integration | Component | purple/add logical expression', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{purple/add-logical-expression}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#purple/add-logical-expression}}
      template block text
    {{/purple/add-logical-expression}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
