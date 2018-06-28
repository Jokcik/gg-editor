import {Injectable} from '@angular/core';
import {Elements} from '../constants';
import {Observable, Subject} from 'rxjs';
import { Range } from 'quill/core/selection';
import {
  Blockquote,
  Bold,
  Cite,
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
  SelectionEditor, Underline,
  UnorderedList
} from '../selection';
import Quill from 'quill/core';
import {registerQuill, TypeQuill} from './quill-register';


@Injectable()
export class QuillService {
  public _quill: Quill;
  // private _renderer: Renderer2;

  private _subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this._subjectSelected.asObservable();

  private _subjectPosition: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public position$: Observable<SelectionEditor> = this._subjectPosition.asObservable();

  constructor() {
  }

  get rootElem(): Element {
    return document.querySelector('.' + Elements.ROOT_ELEMENT);
  }

  get tooltipElement(): HTMLElement {
    return document.querySelector('.' + Elements.TOOLTIP_ELEMENT);
  }

  public setContent(delta) {
    this._quill.setContents(delta, 'api');
  }

  public pasteHTML(html: string) {
    this._quill.clipboard.dangerouslyPasteHTML(html, 'user')
  }

  public convertHTML(html) {
    return this._quill.clipboard.convert(`<div>${html}</div>`);
  }

  public init(type: TypeQuill) {
    registerQuill(Quill, type);
    const elem = this.rootElem;
    this._quill = new Quill(elem);

    elem.addEventListener('scroll', () => {
      console.log('1234');
      this.tooltipElement.style.marginTop = (-1 * elem.scrollTop) + 'px';
    });

    this._quill.on('editor-change', () => this.onSelect());
    this._quill.on('editor-change', (type, range, oldRange, source) => this.onPosition(type, range, oldRange, source));
  }

  private onPosition(type, range, oldRange, source) {
    if (type !== 'selection-change') return;
    if (range != null && range.length > 0 && source === 'user') {
      // Lock our width so we will expand beyond our offsetParent boundaries
      this.tooltipElement.style.left = '0px';
      this.tooltipElement.style.width = '';
      this.tooltipElement.style.width = this.tooltipElement.offsetWidth + 'px';
      let lines = this._quill.getLines(range.index, range.length);
      if (lines.length === 1) {
        this.position(this._quill.getBounds(range), document.body);
      } else {
        let lastLine = lines[lines.length - 1];
        let index = this._quill.getIndex(lastLine);
        let length = Math.min(lastLine.length() - 1, range.index + range.length - index);
        let bounds = this._quill.getBounds(new Range(index, length));
        this.position(bounds, document.body);
      }
    }
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
      under: Underline.createByFormat(format),

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

  public setUnderline(active: boolean) {
    this._quill.format(Underline.TagName, active);
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
      text: '<p>Текст под спойлером</p>',
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

  position(reference, boundsContainer) {
    let left = reference.left + reference.width/2 - this.tooltipElement.offsetWidth/2;
    // root.scrollTop should be 0 if scrollContainer !== root
    let top = reference.top + this._quill.root.scrollTop - 15;
    this.tooltipElement.style.left = left + 'px';
    this.tooltipElement.style.top = top + 'px';
    let containerBounds = boundsContainer.getBoundingClientRect();
    let rootBounds = this.tooltipElement.getBoundingClientRect();
    let shift = 0;
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right;
      this.tooltipElement.style.left = (left + shift) + 'px';
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left;
      this.tooltipElement.style.left = (left + shift) + 'px';
    }
    if (rootBounds.top > containerBounds.top) {
      let height = rootBounds.top - rootBounds.bottom;
      let verticalShift = reference.top - reference.bottom + height;
      this.tooltipElement.style.top = (top - verticalShift) + 'px';
      this.tooltipElement.classList.add('ql-flip');
    }
    return shift;
  }
}
