import TextBlot from 'quill/blots/text';
import Block from 'quill/blots/block';
import Inline from 'quill/blots/block';
import Parchment from 'parchment';
import Container from 'quill/blots/container';

class Spoiler extends Block {
  static create(value) {
    console.log('Spoiler create', value);
    let node = super.create();
    // let node = document.createElement('gg-spoiler');
    node.setAttribute('title', value.title);
    node.setAttribute('active', !!value.active);
    node.setAttribute('contenteditable', false);
    node.setAttribute('show', true);
    node.setAttribute('content', value.value);
    console.log(value.value);
    // node.innerText = value.value;

    return node;
  }

  static formats(domNode) {
    return domNode.tagName === Spoiler.tagName ? this.value(domNode) : undefined;
  }

  constructor(domNode) {
    console.log('constructor')
    super(domNode);
    this.insert = true;

    setTimeout(() => {
      this.spoilerElement(domNode, '.spoiler-content');
      this.spoilerElement(domNode, '.spoiler-head', false);
    });
  }

  // replace(target) {
  //   console.log(target);
  //   if (target.statics.blotName !== this.statics.blotName) {
  //     this.remove();
  //     // let item = Parchment.create(this.statics.defaultChild);
  //     // target.moveChildren(item);
  //     // this.appendChild(item);
  //   }
  //   super.replace(target);
  // }

  spoilerElement(domNode, selector, allowEnter = true) {
    const content = domNode.querySelector(selector);
    content.setAttribute('contenteditable', true);
    content.addEventListener('keydown', (e) => this.spoilerEvent(e, content, allowEnter));
  }

  insertBefore(blot, ref) {
  //   if (this.insert) {
  //     console.log(123);
  //     this.insert = false;
  //     super.insertBefore(blot, ref);
  //   }
  }

  // length() {
  //   console.log(this.scroll.leaf);
  //   let length = this.domNode.textContent.length - 10;
  //   if (!this.domNode.textContent.endsWith('\n')) {
  //     return length + 1;
  //   }
  //   return length;
  // }

  spoilerEvent(event, content, allowEnter = true) {
    console.log('spoilerEvent');
    switch (event.keyCode ) {
      case 13:
        if (!allowEnter) {
          event.preventDefault();
        }
        break;
      case 8:
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
      active: node.getAttribute('active'),
      content: node.getAttribute('content'),
      // value: node.innerHTML,
      value: node.innerText,
    };
  }
}
Spoiler.blotName = 'spoiler';
Spoiler.scope = Parchment.Scope.BLOCK_BLOT;
Spoiler.tagName = 'gg-spoiler';

export default Spoiler;
