import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class FileDownloaderComponent extends Component {
    @tracked selected = A([]);
    @tracked showDownloadModal = false;

    get allSelected() {
        if(!this.args.files){
          return false;
        }
        return this.selected.length === this.args.files.filter(f => f.status === "available").length;
    }

    get someSelected() {
        return this.selected.length > 0 && !this.allSelected;
    }

    @action
    toggleSelection(item) {
        if(item.status !== 'available') {
            return;
        }

        if(this.selected.includes(item)) {
             this.selected = this.selected.filter(i => i !== item);
        } else {
            this.selected.pushObject(item);
        }
    }

    @action
    toggleSelectAll() {
        if(this.allSelected) {
            this.selected = A([]);
        } else {
            this.selected = this.args.files.filter(f => f.status === "available");
        }
    }

    @action
    downloadSelected() {
        if(this.selected.length) {
            this.showDownloadModal = true;
        }
    }

    @action
    closeDownloadModal() {
        this.showDownloadModal = false;
    }
}
