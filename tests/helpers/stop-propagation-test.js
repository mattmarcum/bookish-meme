import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | stop-propagation', function(hooks) {
  setupRenderingTest(hooks);

  test('it stops propagation on an event', async function(assert) {
    assert.expect(1);
    this.set('testFn', function(event){
      assert.ok(true);
    });

    await render(hbs`
    <div {{on "click" this.testFn}}>
      <input type="checkbox" {{on "click" (stop-propagation this.testFn)}}/>
    </div>
    `);

    await click(this.element.querySelector('input'));

  });
});
