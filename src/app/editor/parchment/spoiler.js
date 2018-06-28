import Parchment from 'parchment';

class Spoiler extends Parchment.Embed {
  static create(value) {
    let node = super.create(value);

    node.innerHTML = value.text;
    node.setAttribute('title', value.title);
    node.setAttribute('active', true);
    node.setAttribute('contenteditable', false);
    return node;
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

  spoilerEvent(event, content, allowEnter = true) {
    switch (event.keyCode ) {
      case 13:
        if (!allowEnter) {
          event.preventDefault();
        }
        break;
      case 8:
        if (!content.textContent.trim()) {
          event.preventDefault();
          content.innerHTML = allowEnter ? '<p><br/></p>' : '';
        }
        break;
    }
  }

  static value(domNode) {
    return {
      text: domNode.querySelector('.spoiler-content').innerHTML,
      title: domNode.getAttribute('title')
    };
  }
}

Spoiler.blotName = 'spoiler';
Spoiler.tagName = 'GG-SPOILER';


export default Spoiler;
