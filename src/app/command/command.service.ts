import { Injectable } from '@angular/core';
import {SelectionService} from '../selection';

@Injectable({providedIn: 'root'})
export class CommandService {

  constructor(private selectionService: SelectionService) {
  }

  public bold() {
    document.execCommand('bold');
    this.selectionService.checkActive();
  }

  public italic() {
    document.execCommand('italic', false, null);
    this.selectionService.checkActive();
  }

  public unLink() {
    document.execCommand('unlink', false, false);
    this.selectionService.checkActive();
  }

  public createLink(url: string) {
    document.execCommand('createLink', true, url);
    (this.selectionService.getRangeContent() as HTMLLinkElement).target = '_blank';
    this.selectionService.checkActive();
  }
}
