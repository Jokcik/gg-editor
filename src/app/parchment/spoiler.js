import Delta from 'quill-delta';
import TextBlot from 'quill/blots/text';
import Block from 'quill/blots/block';
import Break from 'quill/blots/break';
import Inline from 'quill/blots/inline';
import Parchment from 'parchment';
import Container from 'quill/blots/container';

class Spoiler extends Container {
  static create(value) {
    let node = super.create();
    node.setAttribute('title', value.title);
    node.setAttribute('active', !!value.active);
    node.setAttribute('contenteditable', false);
    node.setAttribute('show', true);
    node.setAttribute('content', value.content);

    return node;
  }

  static formats(domNode) {
    return domNode.tagName === Spoiler.tagName ? this.value(domNode) : undefined;
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
    if (blot instanceof Block) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      if (!after.parent) { return; };
      after.parent.insertBefore(blot, after);
    }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }

  removeChild(child) {
    this.next.deleteAt(0, this.domNode.querySelector('.spoiler-head').innerHTML.length - 2);
    this.domNode.remove();
    super.removeChild(child)
  }

  spoilerEvent(event, content, allowEnter = true) {
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
    // node.setAttribute('show', true);
    return {
      title: node.getAttribute('title'),
      active: node.getAttribute('active'),
      content: node.getAttribute('content'),
      // value: node.querySelector('.spoiler-content').innerHTML,
      // value: node.innerHTML,
      // value: node.innerText,
    };
  }
}
Spoiler.blotName = 'spoiler';
Spoiler.scope = Parchment.Scope.BLOCK_BLOT;
Spoiler.tagName = 'gg-spoiler';
Spoiler.defaultChild = 'block';
Spoiler.allowedChildren = [Block];

export default Spoiler;
