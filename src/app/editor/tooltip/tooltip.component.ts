import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {OrderedList, SelectionEditor, UnorderedList} from '../models';
import {QuillService} from '../quill-service/quill.service';

@Component({
  selector: 'gg-editor-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, OnChanges {
  @Input() editor: SelectionEditor;

  constructor(private quillService: QuillService,
              private cd: ChangeDetectorRef,) {
  }

  ngOnChanges() {
    console.log('ngOnChanges', this.editor.active);
    setTimeout(() => this.cd.detectChanges(), 100)
  }

  ngOnInit() {
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

  public underline() {
    this.quillService.setUnderline(!this.editor.under.active);
  }

  public ins() {
    this.quillService.setIns(!this.editor.ins.active);
  }

  public bloquote() {
    this.quillService.setBloquote(!this.editor.blockquote.active);
  }

  public divider() {
    this.quillService.appendDivider();
  }

  public spoiler() {
    this.quillService.appendSpoiler();
  }

  public orderedList() {
    this.quillService.list(this.editor.orderedList.active ? undefined : OrderedList.formatType);
  }

  public unorderedList() {
    this.quillService.list(this.editor.unorderedList.active ? undefined : UnorderedList.formatType);
  }

  public header(level: number) {
    this.quillService.setHeader(level);
  }

  public cite() {
    const src = 'https://goodgame.ru/';
    this.quillService.appendCite(src);
  }


}
