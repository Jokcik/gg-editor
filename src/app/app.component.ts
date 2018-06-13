import {Component, OnInit} from '@angular/core';
import {SelectionEditor, SelectionService} from './selection';
import {CommandService} from './command';
import {LinkBlot} from './parchment/link';
import Parchment from 'parchment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public editor: SelectionEditor = new SelectionEditor();

  constructor(private selectionService: SelectionService,
              private commandService: CommandService) {
  }

  ngOnInit() {
    console.log(LinkBlot);
    console.log(Parchment.create('link').parent);
    this.selectionService.selected$.subscribe(result => this.editor = result)
  }

  bold() {
    this.commandService.bold();
  }

  italic() {
    this.commandService.italic();
  }

  addLink() {
    const url = 'example.com';
    this.commandService.createLink(url);
  }

  unlink() {
    this.commandService.unLink();
  }

  formatH1() {
    this.commandService.h1(this.editor.h1.active);
  }

  formatH2() {
    this.commandService.h2(this.editor.h2.active);
  }

  formatH3() {
    this.commandService.h3(this.editor.h3.active);
  }

  formatDel() {
    this.commandService.del(this.editor.del.active);
  }

  formatDt() {
    this.commandService.dt(this.editor.dt.active);
  }

  formatDd() {
    this.commandService.dd(this.editor.dd.active);
  }

  appendHr() {
    this.commandService.hr();
  }

  formatOrderedList() {
    this.commandService.insertOrderedList();
  }

  formatUnorderedList() {
    this.commandService.insertUnorderedList();
  }

  formatIns() {
    this.commandService.ins(this.editor.ins.active);
  }

  formatCite() {
    const url = 'example.com';
    this.commandService.cite(this.editor.cite.active, url);
  }

  formatBlockquote() {
    this.commandService.blockquote(this.editor.blockquote.active);
  }

  upload() {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = () => {
      const fileList = input.files;
      const url = URL.createObjectURL(fileList.item(0));
      const img = document.createElement('img');
      img.setAttribute('src', url);
      document.body.querySelector('.ql-editor').appendChild(img);
      // document.execCommand('insertImage', true, url);
    }
  }
}
