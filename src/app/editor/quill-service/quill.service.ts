import {Injectable} from '@angular/core';
import {Elements} from '../constants';
import {Observable, Subject} from 'rxjs';
import {Range} from 'quill/core/selection';
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
  SelectionEditor,
  Underline,
  UnorderedList
} from '../selection';
import Quill from 'quill/core';
import {registerQuill, TypeQuill} from './register/quill-register';
import {QuillKeyboardService} from './register/quill-keyboard.service';
import {QuillTooltipService} from './register/quill-tooltip.service';


@Injectable()
export class QuillService {
  public _quill: Quill;
  // private _renderer: Renderer2;

  private _subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this._subjectSelected.asObservable();

  private _subjectPosition: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public position$: Observable<SelectionEditor> = this._subjectPosition.asObservable();

  constructor(private keyboardService: QuillKeyboardService,
              private tooltipService: QuillTooltipService) {
  }

  get rootElem(): Element {
    return document.querySelector('.' + Elements.ROOT_ELEMENT);
  }

  get clipboardElem(): Element {
    return document.querySelector('.' + Elements.CLIPBOARD_ELEMENT);
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

    this._quill = new Quill(elem, {
      modules: {
        clipboard: {
          matchers: this.keyboardService.getMatchers()
        },
        keyboard: {
          bindings: this.keyboardService.getBinging(this)
        }
      }
    });

    elem.addEventListener('scroll', () => this.tooltipService.onScroll(elem));

    this._quill.on('editor-change', () => this.onSelect());
    this._quill.on('editor-change', (type, range, oldRange, source) => this.tooltipService.changePosition(this, type, range, oldRange, source));
  }

  private onSelect() {
    const select = this._quill.getSelection();
    console.log(select);
    if (!select) { return; }
    const format = this._quill.getFormat(select);

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
    const range: Range = this._quill.getSelection(true);
    const contents = this._quill.getText(range);
    const format = this._quill.getFormat(range);
    this._quill.deleteText(range);
    // this._quill.insertText(range.index, '\n', Quill.sources.USER);
    this._quill.insertEmbed(range.index, 'spoiler', {
      title: 'Вставьте заголовок спойлера',
      text: `<p>${contents}</p>`,
      active: true
    }, Quill.sources.USER);
    this._quill.setSelection(range.index + 1, Quill.sources.SILENT);
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
