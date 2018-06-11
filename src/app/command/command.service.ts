import { Injectable } from '@angular/core';
import {SelectionService} from '../selection';

@Injectable({providedIn: 'root'})
export class CommandService {

  constructor(private selectionService: SelectionService) {
    this.selectionService.renderer.listen('document', 'keydown.enter',
        event => !!setTimeout(() => this.newLine(event)));
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
    this.selectionService.updateActive();
  }

  public insertUnorderedList() {
    this.exec('insertUnorderedList');
    this.selectionService.updateActive();
  }

  public blockquote(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'blockquote');
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
    const selection = document.getSelection();
    const tagName = 'p';

    const elem = this.selectionService.renderer.createElement(tagName);
    elem.innerHTML = '<br/>';

    const replaceElem = selection.anchorNode.parentElement;
    if (replaceElem.nodeName.toLowerCase() === tagName) {
      replaceElem.parentElement.replaceChild(elem, replaceElem);
    }
  }
}
