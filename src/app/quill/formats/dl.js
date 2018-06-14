import Parchment from 'parchment';
import Block from '../blots/block';
import Container from '../blots/container';


class DlItem1 extends Block {
  // static create(value) {
  //   console.log('DlItem1', value);
  //   let tagName = value === 'terming' ? 'DT' : 'DD';
  //   let node = super.create(tagName);
  //   return node;
  // }
  //
  // static formats(domNode) {
  //   if (domNode.tagName === 'DT') { return 'terming' }
  //   if (domNode.tagName === 'DD') {
  //     return super.formats(domNode);
  //   }
  //
  //   return undefined;
  // }

  format(name, value) {
    if (name === DL.blotName && !value) {
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

  // replaceWith(name, value) {
  //   this.parent.isolate(this.offset(this.parent), this.length());
  //   if (name === this.parent.statics.blotName) {
  //     this.parent.replaceWith(name, value);
  //     return this;
  //   } else {
  //     this.parent.unwrap();
  //     return super.replaceWith(name, value);
  //   }
  // }
}
DlItem1.blotName = 'dl-item1';
DlItem1.tagName = 'DT';

class DlItem2 extends Block {
  // static create(value) {
  //   console.log('DlItem2', value);
  //   let tagName = value === 'terming' ? 'DT' : 'DD';
  //   let node = super.create(tagName);
  //   return node;
  // }
  //
  // static formats(domNode) {
  //   if (domNode.tagName === 'DT') { return 'terming' }
  //   if (domNode.tagName === 'DD') {
  //     return super.formats(domNode);
  //   }
  //
  //   return undefined;
  // }

  format(name, value) {
    console.log('format(name', name, value);
    if (name === DL.blotName && !value) {
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

  // replaceWith(name, value) {
  //   this.parent.isolate(this.offset(this.parent), this.length());
  //   if (name === this.parent.statics.blotName) {
  //     this.parent.replaceWith(name, value);
  //     return this;
  //   } else {
  //     this.parent.unwrap();
  //     return super.replaceWith(name, value);
  //   }
  // }
}
DlItem2.blotName = 'dl-item2';
DlItem2.tagName = 'DD';

class DL extends Container {
  static formats(domNode) {
    return domNode.tagName === DL.tagName ? true : undefined;
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  insertBefore(blot, ref) {
    console.log('insertBefore(blot, ref) ', blot, ref);;
    if (blot instanceof DlItem1 || blot instanceof DlItem2) {
      super.insertBefore(blot, ref);
      console.log('BbBBBBBBBBBB')
    } else {
      console.log('AAAAAAAAAAA')
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      after.parent.insertBefore(blot, after);
    }
  }

  replace(target) {
    console.log('replace', target);
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}
DL.blotName = 'dll';
DL.scope = Parchment.Scope.BLOCK_BLOT;
DL.tagName = 'DL';
DL.defaultChild = 'dl-item1';
DL.allowedChildren = [DlItem2, DlItem1];


export { DlItem1, DlItem2, DL as default };
