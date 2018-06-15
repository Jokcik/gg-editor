import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Elements} from '../constants';
import {Observable, Subject} from 'rxjs';
import {Bold, Del, Divider, Img, Ins, Italic, Link, SelectionEditor} from '../selection';
import Quill from 'quill/core';
import {registerQuill} from './quill-register';


@Injectable({providedIn: 'root'})
export class QuillService {
  public _quill: Quill;
  private _renderer: Renderer2;

  private _subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this._subjectSelected.asObservable();

  constructor(private rendererFactory: RendererFactory2) {
    registerQuill(Quill);
  }

  get rootElem(): Element {
    return document.querySelector('.' + Elements.ROOT_ELEMENT);
  }

  public init() {
    this._quill = new Quill(this.rootElem);
    this._quill.on('selection-change', () => this.onSelect());
    this._renderer = this.rendererFactory.createRenderer(this.rootElem, null);
  }

  private onSelect() {
    const select = this._quill.getSelection();
    const format = this._quill.getFormat(select);

    const result: SelectionEditor = {
      active: select.length > 0,

      bold: Bold.createByFormat(format),
      italic: Italic.createByFormat(format),
      del: Del.createByFormat(format),
      ins: Ins.createByFormat(format),
      link: Link.createByFormat(format),
    };

    this._subjectSelected.next(result);
  }

  public setBold(active: boolean) {
    this._quill.format(Bold.TagName, active);
    this.onSelect();
  }

  public setItalic(active: boolean) {
    this._quill.format(Italic.TagName, active);
    this.onSelect();
  }

  public setDelete(active: boolean) {
    this._quill.format(Del.TagName, active);
    this.onSelect();
  }

  public setIns(active: boolean) {
    this._quill.format(Ins.TagName, active);
    this.onSelect();
  }

  public appendDivider() {
    let range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, Divider.TagName, true, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public appendSpoiler() {
    const range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, 'spoiler', {
      title: 'spoiler',
      value: 'VALUEVALUEVALUEVALUE'
    }, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);  }

  public appendImg(src: string) {
    const range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, Img.TagName, {
      alt: 'Quill Cloud',
      url: src
    }, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public setLink(url: string) {
    this._quill.format(Link.TagName, url || undefined);
    this.onSelect();
  }
}
