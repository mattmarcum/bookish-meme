import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

const files = A([
  {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},

  {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},

  {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},

  {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},

  {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
]);

module('Integration | Component | file-downloader', function(hooks) {
  setupRenderingTest(hooks);

  test('it has none selected by default', async function(assert) {
    this.set('files', files)

    await render(hbs`<FileDownloader @files={{this.files}} />`);

    assert.equal(this.element.querySelector('[data-test-fd-selected-text]').textContent.trim(), 'None Selected');
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').indeterminate, false);
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').checked, false);
    assert.equal(this.element.querySelector('[data-test-fd-download]').disabled, true);
  });

  test('it does not allow non-available files to be selected', async function(assert) {
    this.set('files', files)

    await render(hbs`<FileDownloader @files={{this.files}} as |selected toggleSelection|>
      <button data-test-add-file {{on "click" (fn toggleSelection this.files.firstObject)}}/>
    </FileDownloader>`);
    await click('[data-test-add-file]');

    assert.equal(this.element.querySelector('[data-test-fd-selected-text]').textContent.trim(), 'None Selected');

  });

  test('it does allow 1 available file to be selected and sets indeterminate status', async function(assert) {
    this.set('files', files)

    await render(hbs`<FileDownloader @files={{this.files}} as |selected toggleSelection|>
      <button data-test-add-file {{on "click" (fn toggleSelection (object-at 2 this.files))}}/>
    </FileDownloader>`);
    await click('[data-test-add-file]');

    assert.equal(this.element.querySelector('[data-test-fd-selected-text]').textContent.trim(), 'Selected 1');
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').indeterminate, true);
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').checked, false);
    assert.equal(this.element.querySelector('[data-test-fd-download]').disabled, false);

  });

  test('it allows all available files to be selected when allSelected checkbox is clicked', async function(assert) {
    this.set('files', files)

    await render(hbs`<FileDownloader @files={{this.files}} as |selected toggleSelection|>
    </FileDownloader>`);
    await click('[data-test-fd-allSelected]');

    assert.equal(this.element.querySelector('[data-test-fd-selected-text]').textContent.trim(), 'Selected 2');
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').indeterminate, false);
    assert.equal(this.element.querySelector('[data-test-fd-allSelected]').checked, true);
    assert.equal(this.element.querySelector('[data-test-fd-download]').disabled, false);
  });

  test('it shows the dowload modal when dowload button is clicked', async function(assert) {
    this.set('files', files)

    await render(hbs`<FileDownloader @files={{this.files}}/>`);
    await click('[data-test-fd-allSelected]');
    await click('[data-test-fd-download]');

    assert.ok(this.element.querySelectorAll('[data-test-fd-modal]'));
    assert.equal(this.element.querySelectorAll('[data-test-fd-modal] li').length, 2);
  });
});
