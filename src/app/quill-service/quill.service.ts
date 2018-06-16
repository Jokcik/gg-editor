import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Elements} from '../constants';
import {Observable, Subject} from 'rxjs';
import {
  Blockquote,
  Bold, Cite,
  Del,
  Divider,
  H1,
  H2,
  H3,
  Img,
  Ins,
  Italic,
  Link,
  OrderedList,
  SelectionEditor,
  UnorderedList
} from '../selection';
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
    this._quill.on('editor-change', () => this.onSelect());
    this._renderer = this.rendererFactory.createRenderer(this.rootElem, null);
  }

  private onSelect() {
    const select = this._quill.getSelection();
    if (!select) { return; }
    const format = this._quill.getFormat(select);
    console.log(format);

    const result: SelectionEditor = {
      active: select.length > 0,

      bold: Bold.createByFormat(format),
      italic: Italic.createByFormat(format),
      del: Del.createByFormat(format),
      ins: Ins.createByFormat(format),
      link: Link.createByFormat(format),
      blockquote: Blockquote.createByFormat(format),
      cite: Cite.createByFormat(format),

      h1: H1.createByFormat(format),
      h2: H2.createByFormat(format),
      h3: H3.createByFormat(format),
      unorderedList: UnorderedList.createByFormat(format),
      orderedList: OrderedList.createByFormat(format),
    };

    this._subjectSelected.next(result);
  }

  public setBold(active: boolean) {
    this._quill.format(Bold.TagName, active);
  }

  public setItalic(active: boolean) {
    this._quill.format(Italic.TagName, active);
  }

  public setDelete(active: boolean) {
    this._quill.format(Del.TagName, active);
  }

  public setIns(active: boolean) {
    this._quill.format(Ins.TagName, active);
  }

  public setBloquote(active: boolean) {
    this._quill.format(Blockquote.TagName, active);
  }

  public setHeader(level: number) {
    this._quill.format(H1.TagName, level || undefined);
  }

  public list(type: string) {
    this._quill.format(OrderedList.TagName, type || undefined);
  }

  public appendDivider() {
    let range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, Divider.TagName, true, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public appendCite(url: string) {
    let range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, Cite.TagName, {url, text: 'Введите источник'}, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public appendSpoiler() {
    const range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, 'spoiler', {
      title: 'Вставьте заголовок спойлера',
      value: 'Текст под спойлером',
      active: true
    }, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public appendImg(src: string) {
    const range = this._quill.getSelection(true);
    this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index + 1, Img.TagName, src, Quill.sources.USER);
    this._quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  public setLink(url: string) {
    this._quill.format(Link.TagName, url || undefined);
  }
}
