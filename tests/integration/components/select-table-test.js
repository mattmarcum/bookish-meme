import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

const files = A([
  {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},

  {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},

  {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},

  {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},

  {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
]);

const renderString = hbs`<SelectTable @data={{this.data}} @columns={{keys this.data.firstObject}} @selected={{this.selected}} @toggleSelection={{this.toggleSelection}} as |StHeader StRows|>
<StHeader as |StColumn columns|>
    {{#each columns as |column|}}
      <StColumn align="left">{{column}}</StColumn>
    {{/each}}
</StHeader>
<StRows class="small-text" as |StCell columns rowData|>
    {{#each columns as |column|}}
      <StCell>{{get rowData column}}</StCell>
    {{/each}}
</StRows>
</SelectTable>
`

module('Integration | Component | select-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with no selected rows', async function(assert) {

    this.set('selected', A([]));
    this.set('data', files);
    this.set('toggleSelection', ()=>{});

    await render(renderString);

    assert.equal(this.element.querySelectorAll('input[type=checkbox]:checked').length, 0);
  });

  test('it renders with one pre-selected rows', async function(assert) {

    this.set('selected', A([files[0]]));
    this.set('data', files);
    this.set('toggleSelection', ()=>{});

    await render(renderString);

    assert.equal(this.element.querySelectorAll('input[type=checkbox]:checked').length, 1);
  });

  test('it renders and selects a row', async function(assert) {
    assert.expect(1);
    this.set('selected', A());
    this.set('data', files);
    this.set('toggleSelection', (row)=>{
      assert.equal(row, files[0]);
    });

    await render(renderString);
    await click(this.element.querySelector('input[type=checkbox]'));
  });
});
