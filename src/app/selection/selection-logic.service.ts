import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable()
export class SelectionLogicService {

  private _renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  public activeAll(range: Range, parent: Element, tagName: string, withoutInner: boolean = false): boolean {
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

  public deleteTagSelected(range: Range, tagName: string) {
    const regExp = new RegExp(`<${tagName}.*?>(.*?)</${tagName}>`, "g");
    this.changeSelected(range, value => value.replace(regExp, `$1`));
  }

  public replaceSelected(range: Range, currentTag: string, replaceTag: string) {
    const regExp = new RegExp(`<${currentTag}.*?>(.*?)</${currentTag}>`, "g");
    this.changeSelected(range, value => value.replace(regExp, `<${replaceTag}>$1</${replaceTag}>`));
  }

  public wrapSelected(range: Range, currentTag: string, replaceTag: string) {
    let regExp;
    if (currentTag) {
      regExp = new RegExp(`(<${currentTag}.*?>.*?</${currentTag}>)`, "g");
    } else {
      regExp = new RegExp(`(.+)`, "g");
    }

    this.changeSelected(range, value => value.replace(regExp, `<${replaceTag}>$1</${replaceTag}>`));
  }

  private changeSelected(range: Range, func: (value) => any) {
    let contens: Node = range.extractContents();

    const result: Node = document.createDocumentFragment();
    console.log(contens.cloneNode(true));
    for (let i = 0; i < contens.childNodes.length; ++i) {
      const copy = contens.cloneNode(true); // костыль, так как childNodes в какой то момент уменьшается
      let item = copy.childNodes.item(i);
      if (!item.textContent) { continue; }

      // создаем HTML елемент, проводим действия внутри и добавляем потомков в результат
      const elem: HTMLElement = this._renderer.createElement('span');
      elem.appendChild(item);
      elem.innerHTML = func(elem.innerHTML);
      for (let j = 0; j < elem.childNodes.length; ++j) {
        const child = elem.childNodes.item(j);
        if (!child.textContent) { continue; }
        result.appendChild(child);
      }
    }

    range.insertNode(result);
  }

  private checkClosest(elem: Element, tagName) {
    // TODO: по идеи должно работать и без elem.tagName === ...
    return !!elem.closest(tagName) || elem.tagName === tagName.toUpperCase();
  }
}
