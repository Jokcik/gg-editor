import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Elements} from '../constants';
import {SelectionEditor} from './selection';
import {H1} from './h1';
import {H2} from './h2';
import {H3} from './h3';
import {Blockquote} from './blockquote';

@Injectable({providedIn: 'root'})
export class SelectionService {
  private subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this.subjectSelected.asObservable();

  private _renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.onInit(rendererFactory);
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }

  private onInit(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this._renderer.listen('document', 'mouseup', event => this.onSelect(event));
    this._renderer.listen('document', 'keyup', event => this.onSelect(event));
  }

  get renderer(): Renderer2 {
    return this._renderer;
  }

  get rootElem(): Element {
    return document.querySelector('.' + Elements.ROOT_ELEMENT);
  }

  private onSelect(event?: Event) {
    const selection = window.getSelection();
    if (window.getSelection().isCollapsed) {
      this.subjectSelected.next(new SelectionEditor());
      return;
    }

    const result: SelectionEditor = {
      active: !selection.isCollapsed,
      activeLink: this.isActiveLink(),
      activeBold: this.isActiveBold(),
      activeItalic: this.isActiveItalic(),
      h1: this.isH1(),
      h2: this.isH2(),
      h3: this.isH3(),
      blockquote: this.isBlockquote()
    };

    this.subjectSelected.next(result);
  }

  private isActiveLink(): boolean {
    if (document.queryCommandState('createLink')) { return true; }
    return this.activeAll('a');
  }

  private isActiveBold(): boolean {
    if (document.queryCommandState('bold')) { return true; }
    return this.activeAll('b', true) || this.activeAll('strong', true);
  }

  private isActiveItalic(): boolean {
    if (document.queryCommandState('italic')) { return true; }
    return this.activeAll('em', true) || this.activeAll('i', true);
  }

  private isH1(): H1 {
    const active = this.activeAll('h1', true);
    const check = !!this.rootElem.querySelector('h1');
    return {active, check};
  }

  private isH2(): H2 {
    const active = this.activeAll('h2', true);
    return {active};
  }

  private isH3(): H3 {
    const active = this.activeAll('h3', true);
    return {active};
  }

  private isBlockquote(): Blockquote {
    const active = this.activeAll('blockquote', true);
    return {active};
  }

  public updateActive() {
    this.onSelect();
  }

  public getRange(): Range {
    return window.getSelection().getRangeAt(0);
  }

  public getSelection(): Selection {
    return window.getSelection();
  }

  public getRangeContent(): HTMLElement {
    const ancestor = this.getRange().commonAncestorContainer;
    return ancestor.firstChild ? ancestor.firstChild.parentElement : ancestor.parentElement;
  }

  private activeAll(tagName: string, withoutInner: boolean = false): boolean {
    const range = this.getRange();

    const parent: Element = this.getRangeContent();
    if (parent && this.checkClosest(parent, tagName)) { return true; } // если родитель и его предки содерждать tagName --> true

    const contens = range.cloneContents();
    if (!withoutInner) { // если поиск везде, то просто ищем этот тег у любого потомка
      return !!contens.querySelector(tagName);
    }

    for (let i = 0; i < contens.childNodes.length; ++i) { // если хотябы 1 из потомков не является tagName --> false
      const node = contens.childNodes.item(i);
      if (node.nodeName.toLowerCase() !== tagName) {
        return false;
      }
    }

    return true;
  }

  private checkClosest(elem: Element, tagName) {
    // TODO: по идеи должно работать и без elem.tagName === ...
    return !!elem.closest(tagName) || elem.tagName === tagName.toUpperCase();
  }

}
