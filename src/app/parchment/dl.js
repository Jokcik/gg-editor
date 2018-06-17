import Parchment from 'parchment';
import Block from 'quill/blots/block';
import Container from 'quill/blots/container';
import {DlItem1} from "./dll";


class DlItem extends Block {
  static create(value) {
    // console.log('value', value)
    // let tagName = value === 'term' ? 'DT' : 'DD';
    // console.log('class DlItem1 extends', value);
    console.log('create', value % 2 === 0);
    let node = super.create(value % 2 === 1 ? 'dt' : 'dd' );
    // console.log(node);
    // let node = super.create('dt');
    // console.log('CREATE', node);
    return node;
  }

  static formats(domNode) {
    // console.log(domNode);
    index = 0;
    return domNode.tagName === Dl.tagName ? domNode : undefined;
  }

  format(name, value) {
    console.log('format');
    if (name === DlItem1.blotName && !value) {
      this.replaceWith(Parchment.create(this.statics.scope));
    } else {
      super.format(name, value);
    }
  }

  remove() {
    if (this.prev == null && this.next == null) {
      this.parent.remove();
    } else {
      super.remove();
    }
  }

  replaceWith(name, value) {
    console.log('REPLACEEEE');
    if (!this.domNode.textContent) {
      const next = this.next;
      this.domNode.remove();
      this.parent.insertBefore(Parchment.create('block'), this.next);
      next.remove();
      return;
    }
    if (this.domNode.tagName === 'DD' || this.domNode.tagName === 'DT') {
      console.log('1234asdfasd', this.domNode);
      value = this.domNode.tagName === 'DD' ? 1 : 0;
      const next = this.next;
      this.parent.insertBefore(Parchment.create('dl-item', value), next);
      next.remove();
      return;
    }

    this.parent.isolate(this.offset(this.parent), this.length());
    if (name === this.parent.statics.blotName) {
      console.log('1111111');
      this.parent.replaceWith(name, value);
      return this;
    } else {
      console.log('22222222');
      this.parent.unwrap();
      return super.replaceWith(name, value);
    }
  }
}
DlItem.blotName = 'dl-item';
DlItem.scope = Parchment.Scope.BLOCK_BLOT;
DlItem.tagName = ['DT', 'DD'];
let index = 0;

class Dl extends Container {
  static create(value) {
    index += 1;
    let node = super.create();
    return node;
  }

  static formats(domNode) {
    return domNode.tagName === Dl.tagName ? true : undefined;
  }

  constructor(domNode) {
    super(domNode);
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    console.log(123);
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  insertBefore(blot, ref) {
    if (blot instanceof DlItem) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      after.parent.insertBefore(blot, after);
    }
  }

  optimize(context) {
    super.optimize(context);
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName) {
      next.moveChildren(this);
      next.remove();
    }
  }

  replace(target,value) {
    console.log('replace', target.children);
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild, index);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}
Dl.blotName = 'dl';
Dl.scope = Parchment.Scope.BLOCK_BLOT;
Dl.tagName = 'Dl';
Dl.defaultChild = 'dl-item';
Dl.allowedChildren = [DlItem];


export { DlItem, Dl as default };
