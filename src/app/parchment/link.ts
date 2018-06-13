import Parchment from 'parchment';

export class LinkBlot extends Parchment.Inline {
  static blotName = 'link';
  static tagName = 'A';

  public static create(url) {
    console.log('create', super.create);
    let node: Element = <any>super.create('123');
    node.setAttribute('href', url);
    node.setAttribute('target', '_blank');
    node.setAttribute('title', node.textContent);
    return node;
  }

  public static formats(domNode) {
    return domNode.getAttribute('href') || true;
  }

  format(name, value) {
    if (name === 'link' && value) {
      this.domNode.setAttribute('href', value);
    } else {
      super.format(name, value);
    }
  }

  formats() {
    let formats = super.formats();
    formats['link'] = LinkBlot.formats(this.domNode);
    return formats;
  }
}

Parchment.register(LinkBlot);
