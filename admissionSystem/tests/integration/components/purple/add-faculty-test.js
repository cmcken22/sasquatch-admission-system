import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purple/add-faculty', 'Integration | Component | purple/add faculty', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{purple/add-faculty}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#purple/add-faculty}}
      template block text
    {{/purple/add-faculty}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
