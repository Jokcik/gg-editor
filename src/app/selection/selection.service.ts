import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SelectionEditor} from './selection';

@Injectable({providedIn: 'root'})
export class SelectionService {
  private subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this.subjectSelected.asObservable();

  private _renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this.onInit();
  }

  private onInit() {
    this._renderer.listen('document', 'mouseup', event => this.onSelect(event));
    this._renderer.listen('document', 'keyup', event => this.onSelect(event));
  }

  get renderer(): Renderer2 {
    return this._renderer;
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
      activeItalic: this.isActiveItalic()
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

  public checkActive() {
    this.onSelect();
  }

  public getRange(): Range {
    return window.getSelection().getRangeAt(0);
  }

  public getRangeContent(): HTMLElement {
    const ancestor = this.getRange().commonAncestorContainer;
    return ancestor.firstChild ? ancestor.firstChild.parentElement : ancestor.parentElement;
  }

  private activeAll(tagName: string, withoutInner: boolean = false): boolean {
    const range = this.getRange();

    const parent: Element = this.getRangeContent();
    if (parent && this.checkClosest(parent, tagName)) { return true; }

    const contens = range.cloneContents();
    if (!withoutInner) {
      return !!contens.querySelector(tagName);
    }

    for (let i = 0; i < contens.childNodes.length; ++i) {
      const node = contens.childNodes.item(i);
      if (node.nodeName.toLowerCase() !== tagName) {
        return false;
      }
    }

    return true;
  }

  private checkClosest(elem: Element, tagName) {
    return !!elem.closest(tagName) || elem.tagName === tagName.toUpperCase();
  }

  private activeOne(elem: Element, tagName: string, withoutInner: boolean) {
    const range = this.getRange();

    return ((!withoutInner) && !!elem.querySelector(tagName)) ||
      elem.tagName === tagName.toUpperCase() ||
      !!elem.closest(tagName) ||
      range.commonAncestorContainer.nodeName === tagName.toUpperCase();
  }
}
