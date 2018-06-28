import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {OrderedList, SelectionEditor, UnorderedList} from '../selection';
import {QuillService} from '../quill-service/quill.service';

@Component({
  selector: 'gg-editor-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit {
  @Input() editor: SelectionEditor = new SelectionEditor();
  @Input() left: number;
  @Input() right: number;

  constructor(private quillService: QuillService,
              private elementRef: ElementRef,
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

  public img() {
    const src = 'https://pp.userapi.com/c5661/u89683801/152004832/x_bc58fc33.jpg';
    this.quillService.appendImg(src);
  }

  public cite() {
    const src = 'https://goodgame.ru/';
    this.quillService.appendCite(src);
  }


}
