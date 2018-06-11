import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Elements} from '../constants';
import {SelectionEditor} from './selection';
import {Blockquote, H1, H2, H3} from './blocks';
import {SelectionLogicService} from './selection-logic.service';

@Injectable({providedIn: 'root'})
export class SelectionService {
  private subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this.subjectSelected.asObservable();

  private _renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2,
              private selectionLogigService: SelectionLogicService) {
    this.onInit();
  }

  private onInit() {
    this._renderer = this.rendererFactory.createRenderer(null, null);
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
      blockquote: this.isBlockquote(),
      cite: this.isCite(),
      del: this.isDel(),
      ins: this.isIns()
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
    const active = this.activeAll('h1');
    const check = !!this.rootElem.querySelector('h1');
    return {active, check};
  }

  private isH2(): H2 {
    const active = this.activeAll('h2');
    return {active};
  }

  private isH3(): H3 {
    const active = this.activeAll('h3');
    return {active};
  }

  private isBlockquote(): Blockquote {
    const active = this.activeAll('blockquote',);
    return {active};
  }

  private isCite(): Blockquote {
    const active = this.activeAll('cite');
    return {active};
  }

  private isDel(): Blockquote {
    const active = this.activeAll('del');
    return {active};
  }

  private isIns(): Blockquote {
    const active = this.activeAll('ins');
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

  public activeAll(tagName: string, withoutInner: boolean = false): boolean {
    return this.selectionLogigService.activeAll(this.getRange(), this.getRangeContent(), tagName, withoutInner);
  }

  public deleteTagSelected(tagName: string) {
    this.selectionLogigService.deleteTagSelected(this.getRange(), tagName);
  }

  public replaceSelected(currentTag: string, replaceTag: string) {
    this.selectionLogigService.replaceSelected(this.getRange(), currentTag, replaceTag);
  }

  public wrapSelected(currentTag: string, replaceTag: string) {
   this.selectionLogigService.wrapSelected(this.getRange(), currentTag, replaceTag);
  }

}
