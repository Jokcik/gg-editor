import { Injectable } from '@angular/core';
import {SelectionService} from '../selection';

@Injectable({providedIn: 'root'})
export class CommandService {

  constructor(private selectionService: SelectionService) {
    this.selectionService.renderer.listen('document', 'keydown.enter',
        event => !!setTimeout(() => this.newLine(event), 0));
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

  public blockquote(active: boolean) {
    this.exec('formatBlock', false, active ? 'p' : 'blockquote');
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

    const elem = document.createElement(tagName);
    elem.innerHTML = '<br/>';

    const replaceElem = selection.anchorNode.parentElement;
    if (replaceElem.nodeName.toLowerCase() === tagName) {
      replaceElem.parentElement.replaceChild(elem, replaceElem);
    }
  }
}
