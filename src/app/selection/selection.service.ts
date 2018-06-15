import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {backspaceBlock, blocks, Elements} from '../constants';
import {SelectionEditor} from './selection';
import {Blockquote, Cite, Dd, Del, Dt, H1, H2, H3, Ins, OrderedList, UnorderedList} from './blocks';
import {SelectionLogicService} from './selection-logic.service';
import * as rangy from 'rangy';

@Injectable({providedIn: 'root'})
export class SelectionService {
  private subjectSelected: Subject<SelectionEditor> = new Subject<SelectionEditor>();
  public selected$: Observable<SelectionEditor> = this.subjectSelected.asObservable();

  private _renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2,
              private selectionLogicService: SelectionLogicService) {
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

  get parentRootElem(): Element {
    return document.querySelector('.' + Elements.PARENT_ROOT_ELEMENT);
  }

  private onSelect(event?: Event) {
    // const selection = this.getSelection();
    // if (selection.isCollapsed) {
    //   this.subjectSelected.next(new SelectionEditor());
    //   return;
    // }
    //
    // const result: SelectionEditor = {
    //   active: !selection.isCollapsed,
    //   activeLink: this.isActiveLink(),
    //   activeBold: this.isActiveBold(),
    //   activeItalic: this.isActiveItalic(),
    //   h1: this.isH1(),
    //   h2: this.isH2(),
    //   h3: this.isH3(),
    //   blockquote: this.isBlockquote(),
    //   cite: this.isCite(),
    //   del: this.isDel(),
    //   ins: this.isIns(),
    //   dd: this.isDd(),
    //   dt: this.isDt(),
    //   orderedList: this.isOrederedList(),
    //   unorderedList: this.isUnorederedList()
    // };
    //
    // this.subjectSelected.next(result);
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

  private isCite(): Cite {
    const active = this.activeAll('cite');
    return {active};
  }

  private isDel(): Del {
    const active = this.activeAll('del');
    return {active};
  }

  private isDd(): Dd {
    const active = this.activeAll('dd');
    return {active};
  }

  private isDt(): Dt {
    const active = this.activeAll('dt');
    return {active};
  }

  private isOrederedList(): OrderedList {
    const active = this.activeAll('ol');
    return {active};
  }

  private isUnorederedList(): UnorderedList {
    const active = this.activeAll('ul');
    return {active};
  }

  private isIns(): Ins {
    const active = this.activeAll('ins');
    return {active};
  }

  public updateActive() {
    this.onSelect();
  }

  public getRange(): RangyRange {
    return rangy.getSelection().getRangeAt(0);
  }

  public getSelection(): RangySelection {
    return rangy.getSelection();
  }

  public getRangeContent(): HTMLElement {
    const ancestor = this.getRange().commonAncestorContainer;
    return ancestor.firstChild ? ancestor.firstChild.parentElement : ancestor.parentElement;
  }

  public activeAll(tagName: string, withoutInner: boolean = false): boolean {
    return this.selectionLogicService.activeAll(this.getRange(), this.getRangeContent(), tagName, withoutInner);
  }

  public deleteParentTag(element?: Element, tagName: string = 'p') {
    element = element || this.getRangeContent();
    if (tagName) {
      element = element.closest(tagName);
      element = element && element.parentElement;
    }
    if (!element) { return; }
    element.parentElement.replaceChild(element.firstChild.cloneNode(true), element);
  }

  public deleteOuterTags(element?: HTMLElement, tagName: string[] = []) {
    return tagName.some(tag => this.deleteOuterTag(element, tag));
  }

  public deleteOuterTag(element?: HTMLElement, tagName: string = 'p') {
    element = element || this.getRangeContent();
    const parent = element.closest(tagName);
    if (!parent) { return false; }
    parent.remove();

    return true;
  }

  public replaceOuterTags(element: HTMLElement, findTagsName: string[], tagName: string = 'p') {
    findTagsName.forEach(tag => this.replaceOuterTag(element, tag, tagName))
  }

  public replaceOuterTag(element?: Element, findTagName: string = null, tagName: string = 'p') {
    let elem;
    element = element || this.getRangeContent();
    if (!findTagName) {
      elem = element;
    } else {
      elem = element.closest(findTagName);
    }

    if (!elem) { return; }

    let newElem: Element = this.renderer.createElement(tagName);
    newElem.innerHTML = elem.innerHTML;
    console.log('newElem.firstChild', newElem.firstChild.nodeName.toLowerCase());
    if (backspaceBlock.includes(newElem.firstChild.nodeName.toLowerCase())) {
      newElem = <any>newElem.firstChild;
    }
    elem.parentElement.replaceChild(newElem, elem);
  }

  public deleteTagSelected(tagName: string) {
    this.selectionLogicService.deleteTagSelected(this.getRange(), tagName);
  }

  public replaceSelected(currentTag: string, replaceTag: string) {
    this.selectionLogicService.replaceSelected(this.getRange(), currentTag, replaceTag);
  }

  public wrapTag(element: Element, tagName: string = 'p'): Element {
    const newElem: Element = this.renderer.createElement(tagName);
    newElem.appendChild(element.cloneNode(true));
    console.log(newElem);
    element.parentElement.replaceChild(newElem, element);
    return newElem;
  }

  public wrapSelected(currentTag: string, replaceTag: string) {
   this.selectionLogicService.wrapSelected(this.getRange(), currentTag, replaceTag);
  }
}
