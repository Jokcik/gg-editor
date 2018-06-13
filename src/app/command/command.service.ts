import { Injectable } from '@angular/core';
import {SelectionService} from '../selection';
import {backspaceBlock, blocks} from '../constants';


@Injectable({providedIn: 'root'})
export class CommandService {

  constructor(private selectionService: SelectionService) {
    this.selectionService.renderer.listen('document', 'keydown.enter', event => !!setTimeout(() => this.newLine(event)));
    this.selectionService.renderer.listen('document', 'keydown.backspace', event => this.backspace(event));

  }

  public h1(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'h1');
    this.selectionService.updateActive();
  }

  public h2(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'h2');
    this.selectionService.updateActive();
  }

  public h3(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'h3');
    this.selectionService.updateActive();
  }

  public del(active: boolean) {
    if (!active) {
      this.selectionService.wrapSelected(null, 'del');
    } else {
      this.selectionService.deleteTagSelected('del');
    }

    this.selectionService.updateActive();
  }

  public ins(active: boolean) {
    if (!active) {
      this.selectionService.wrapSelected(null, 'ins');
    } else {
      this.selectionService.deleteTagSelected('ins');
    }

    this.selectionService.updateActive();
  }

  public dd(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'dd');
    this.selectionService.updateActive();
  }

  public dt(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'dt');
    this.selectionService.updateActive();
  }

  public hr() {
    this.exec('insertHorizontalRule');
  }

  public insertOrderedList() {
    this.exec('insertOrderedList');
    this.selectionService.deleteParentTag(null, 'ol');
    this.selectionService.updateActive();
  }

  public insertUnorderedList() {
    this.exec('insertUnorderedList');
    this.selectionService.deleteParentTag(null, 'ul');
    this.selectionService.updateActive();
  }

  public blockquote(active: boolean) {
    if (active) {
      this.selectionService.replaceOuterTag(null, 'blockquote', 'p');
    } else {
      this.exec('formatBlock', false, 'blockquote');
    }

    this.selectionService.updateActive();
  }

  public cite(active: boolean, url: string) {
    if (!active) {
      this.selectionService.wrapSelected(null, 'a');
      this.selectionService.wrapSelected(null, 'cite');
    } else {
      this.selectionService.deleteTagSelected('a');
      this.selectionService.deleteTagSelected('cite');
    }

    this.selectionService.updateActive();
  }

  public bold() {
    this.exec('bold');
    this.selectionService.updateActive();
  }

  public italic() {
    this.exec('italic');
    this.selectionService.updateActive();
  }

  public unLink() {
    this.exec('unlink');
    this.selectionService.updateActive();
  }

  public createLink(url: string) {
    this.exec('createLink', true, url);
    (this.selectionService.getRangeContent() as HTMLLinkElement).target = '_blank';
    this.selectionService.updateActive();
  }

  private exec(commandId: string, showUI: boolean = false, value: any = null) {
    document.execCommand(commandId, showUI, value);
  }

  private newLine(event: Event) {
    const ancestor = this.selectionService.getSelection().getRangeAt(0).commonAncestorContainer;

    console.log(ancestor.parentElement.closest('ul'));
    console.log(ancestor.parentElement.closest('ol'));
    const endPositionLine = ancestor.textContent;
    if (!!endPositionLine || this.closestBlocks(ancestor.parentElement, ['ul', 'ol'])) { return; }

    this.selectionService.replaceOuterTags(this.selectionService.getRangeContent(), blocks);
    this.insertP();
  }

  public backspace(event: Event) {
    const element = this.selectionService.getRangeContent();

    let block: Element = this.closestBlocks(element, backspaceBlock);
    if (block && !block.textContent) {
      event.preventDefault();
      block.remove();
      this.insertP();
    }
  }

  private insertP() {
    this.exec('insertHTML', true, '<p><br/></p>');
    this.exec('removeFormat', true);
  }

  private closestBlocks(elem: HTMLElement, blocks: string[]): Element {
    return blocks.map(block => elem.closest(block)).find(elem => !!elem);
  }

  // UNDO
  //
  // save
  // const clone = this.selectionService.rootElem.cloneNode(true);
  // const save = this.selectionService.getSelection().getBookmark(this.selectionService.parentRootElem);
  // this.a.push({range: save, html: clone});
  //
  // restore
  // const a = this.a.pop();
  // const parent = this.selectionService.rootElem.parentElement;
  // this.selectionService.renderer.removeChild(parent, this.selectionService.rootElem);
  // this.selectionService.renderer.appendChild(parent, a.html);
  // this.selectionService.getSelection().moveToBookmark(a.range);
  //

}
