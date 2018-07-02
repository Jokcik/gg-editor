import {Injectable} from '@angular/core';
import {Elements} from '../../constants';
import {QuillService} from '../quill.service';

@Injectable()
export class QuillTooltipService {

  get tooltipElement(): HTMLElement {
    return document.querySelector('.' + Elements.TOOLTIP_ELEMENT);
  }

  constructor() {
  }

  public onScroll(scrollElem) {
    this.tooltipElement.style.marginTop = (-1 * scrollElem.scrollTop) + 'px';
  }

  public changePosition(service: QuillService, type, range, oldRange, source) {
    if (type !== 'selection-change') return;
    if (range != null && range.length > 0 && source === 'user') {
      // Lock our width so we will expand beyond our offsetParent boundaries
      this.tooltipElement.style.left = '0px';
      this.tooltipElement.style.width = '';
      this.tooltipElement.style.width = this.tooltipElement.offsetWidth + 'px';
      this.position(service._quill.getBounds(range), service.rootElem);
    }
  }

  private position(reference, boundsContainer) {
    let left = reference.left + reference.width/2 - this.tooltipElement.offsetWidth/2;
    let top = reference.top + boundsContainer.scrollTop - 30;

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

    return shift;
  }
}
