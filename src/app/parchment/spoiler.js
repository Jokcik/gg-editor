import Block from 'quill/blots/block';
import Parchment from 'parchment';
import Container from 'quill/blots/container';

class Spoiler extends Block {
  static create(value) {
    console.log('Spoiler create', value);
    let node = super.create();
    node.setAttribute('title', value.title);
    node.setAttribute('active', !!value.active);
    node.setAttribute('contenteditable', false);
    node.innerHTML = value.value;

    return node;
  }

  static formats(domNode) {
    super.formats(domNode)
    return domNode.tagName === Spoiler.tagName ? domNode.innerHTML : undefined;
  }

  constructor(domNode) {
    super(domNode);

    setTimeout(() => {
      this.spoilerElement(domNode, '.spoiler-content');
      this.spoilerElement(domNode, '.spoiler-head', false);
    });
  }

  spoilerElement(domNode, selector, allowEnter = true) {
    const content = domNode.querySelector(selector);
    content.setAttribute('contenteditable', true);
    content.addEventListener('keydown', (e) => this.spoilerEvent(e, content, allowEnter));
  }

  insertBefore(blot, ref) {
  }

  spoilerEvent(event, content, allowEnter = true) {
    switch (event.keyCode ) {
      case 13:
        if (!allowEnter) {
          event.preventDefault();
        }
        break;
      case 8:
        console.log(!!content.textContent, content.textContent)
        if (!content.textContent) {
          event.preventDefault();
          content.innerHTML = allowEnter ? '<p><br/></p>' : '';
        }
        break;
    }
  }

  static value(node) {
    return {
      title: node.getAttribute('title'),
      active: node.getAttribute('title'),
      value: node.innerHTML,
    };
  }
}
Spoiler.blotName = 'spoiler';
Spoiler.scope = Parchment.Scope.BLOCK_BLOT;
Spoiler.tagName = 'gg-spoiler';

export default Spoiler;
