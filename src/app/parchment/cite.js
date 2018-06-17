import Parchment from 'parchment';
import Block from 'quill/blots/block';
import Container from 'quill/blots/container';
// import Inline from 'quill/blots/inline';
import Link from 'quill/formats/link';

class Cite extends Container {
  static create(value) {
    const node = super.create();
    node.setAttribute('contenteditable', false);
    if (value.url) {
      const a = Link.create(value.url);
      a.innerHTML = value.url;
      a.setAttribute('contenteditable', true);
      node.appendChild(a);
    } else {
      console.log(node, value);
      node.appendChild(value);
    }

    return node;
  }

  static formats(domNode) {
    return domNode.tagName === Cite.tagName ? domNode.querySelector('a') : undefined;
  }

  constructor(domNode) {
    super(domNode);
    const listEventHandler = (e) => {
      console.log(5555);
      switch (e.keyCode) {
        case 13:
          console.log(123);
          e.preventDefault();
          const next = this.next;
          const parent = this.parent;
          let item = Parchment.create('block');
          item.insertInto(parent, next);
      }
    };

    const a = domNode.querySelector('a');
    if (a) {
      a.setAttribute('contenteditable', true)
    }
    domNode.addEventListener('keydown', listEventHandler);
  }

  insertBefore(blot, ref) {
    if (blot instanceof Link && !this.children.length) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      if (!after || !after.parent) { return; }
      after.parent.insertBefore(blot, after);
    }
    console.log(this.next, this.prev);
  }

  deleteAt(a, l) {
    super.deleteAt(a, l);
    this.remove();
    this.removeChild(a);
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
    this.domNode.remove();
    super.removeChild(child)
  }

}
Cite.blotName = 'cite';
Cite.scope = Parchment.Scope.BLOCK_BLOT;
Cite.tagName = 'cite';
Cite.defaultChild = 'link';
Cite.allowedChildren = [Link];


export { Cite as default }
