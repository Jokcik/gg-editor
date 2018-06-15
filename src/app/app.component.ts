import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SelectionEditor} from './selection';
import {QuillService} from './quill-service/quill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  public editor: SelectionEditor = new SelectionEditor();

  constructor(private quillService: QuillService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.quillService.selected$.subscribe(editor => {
      this.editor = editor;
      this.cd.detectChanges();
    });
  }

  public bold() {
    this.quillService.setBold(!this.editor.bold.active);
  }


  public italic() {
    this.quillService.setItalic(!this.editor.italic.active);
  }

  public link() {
    let url = '';
    if (!this.editor.link.active) {
      url = 'https://goodgame.ru';
    }
    this.quillService.setLink(url);
  }

  public delete() {
    this.quillService.setDelete(!this.editor.del.active);
  }


  public ins() {
    this.quillService.setIns(!this.editor.ins.active);
  }

  public divider() {
    this.quillService.appendDivider();
  }

  public spoiler() {
    this.quillService.appendSpoiler();
  }

  public img() {
    const src = 'https://pp.userapi.com/c5661/u89683801/152004832/x_bc58fc33.jpg';
    this.quillService.appendImg(src);
  }

  public ngAfterViewInit() {
    this.quillService.init();
  }

}
