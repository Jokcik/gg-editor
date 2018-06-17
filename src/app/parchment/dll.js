import Parchment from 'parchment';
import Container from 'quill/blots/container';
import Block from 'quill/blots/block';
import Embed from 'quill/blots/embed';
import Inline from 'quill/blots/inline';
import Scroll from 'quill/blots/scroll';
import Break from 'quill/blots/break';
import TextBlot from 'quill/blots/text';

// class DlItem extends Block {
//   static create(value) {
//     console.log('value', value)
//     let tagName = value === 'term' ? 'DT' : 'DD';
//     let node = super.create(tagName);
//
//     return node;
//   }
//
//   static formats(domNode) {
//     console.log('formats1', domNode.tagName);
//     if (domNode.tagName === 'DT') return 'term';
//     console.log('formats2', domNode.tagName);
//     if (domNode.tagName === 'DD') return 'opr';
//     console.log('formats3', domNode.tagName);
//     return undefined;
//   }
//
//   formats() {
//     // We don't inherit from FormatBlot
//     return { [this.statics.blotName]: this.statics.formats(this.domNode) };
//   }
//
//   insertBefore(blot, ref) {
//     // if (blot instanceof ListItem) {
//       super.insertBefore(blot, ref);
//     // } else {
//     //   let index = ref == null ? this.length() : ref.offset(this);
//     //   let after = this.split(index);
//     //   after.parent.insertBefore(blot, after);
//     // }
//   }
//
//   format(name, value) {
//     if (name === Dl.blotName && !value) {
//       this.replaceWith(Parchment.create(this.statics.scope));
//     } else {
//       super.format(name, value);
//     }
//   }
//
//   remove() {
//     if (this.prev == null && this.next == null) {
//       this.parent.remove();
//     } else {
//       super.remove();
//     }
//   }
//
//   replaceWith(name, value) {
//     this.parent.isolate(this.offset(this.parent), this.length());
//     if (name === this.parent.statics.blotName) {
//       this.parent.replaceWith(name, value);
//       return this;
//     } else {
//       this.parent.unwrap();
//       return super.replaceWith(name, value);
//     }
//   }
//
//   // remove() {
//   //   if (this.prev == null && this.next == null) {
//   //     this.parent.remove();
//   //   } else {
//   //     super.remove();
//   //   }
//   // }
//
//   // replaceWith(name, value) {
//   //   this.parent.isolate(this.offset(this.parent), this.length());
//   //   if (name === this.parent.statics.blotName) {
//   //     this.parent.replaceWith(name, value);
//   //     return this;
//   //   } else {
//   //     this.parent.unwrap();
//   //     return super.replaceWith(name, value);
//   //   }
//   // }
// }
// DlItem.blotName = 'dl-item';
// DlItem.tagName = ['DT', 'DD'];


class DlItem1 extends Block {
  static create(value) {
    // console.log('value', value)
    // let tagName = value === 'term' ? 'DT' : 'DD';
    // console.log('class DlItem1 extends', value);
    console.log('create');
    let node = super.create(index % 2 === 0 ? 'dt' : 'dd' || 'DT');
    // console.log('CREATE', node);
    return node;
  }


  static formats(domNode) {
    console.log(domNode);
    return domNode.tagName === DlItem1.tagName ? 'aaaaa' : undefined;
  }
  // static formats(domNode) {
  //   console.log('formats1', domNode.tagName);
  //   if (domNode.tagName === 'DT') return 'term';
  //   console.log('formats2', domNode.tagName);
  //   if (domNode.tagName === 'DD') return 'opr';
  //   console.log('formats3', domNode.tagName);
  //   return undefined;
  // }

  create() {
    console.log('createINLINE');
  }

  constructor(props) {
    super(props);
    if (props) {
      console.log('constructor', props instanceof DlItem1);
    }
  }

  insertInto(node, ref) {
    index += 1;
    console.log('insertInto1', this.domNode.tagName, node, ref, this.parent && this.parent.index);
    //   // console.log(this.parent);
    //   console.log('insertInto', this.domNode, node, ref, ref && ref.domNode);
    //   if (node instanceof Dl) {
    //     // super.insertInto(node, ref)
    //   }

    super.insertInto(node, ref);
    console.log('insertInto2', this.parent && this.parent.index);
  }

  format(name, value) {
    console.log('format', name, value);
    if (name === Dl.blotName && !value) {
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
    if (!this.domNode.textContent) {
      const next = this.next;
      this.domNode.remove();
      this.parent.insertBefore(Parchment.create('block'), this.next);
      next.remove();
      return;
    }
    console.log('replaceWith');
    this.parent.isolate(this.offset(this.parent), this.length());
    if (name === this.parent.statics.blotName) {
      this.parent.replaceWith(name, value);
      return this;
    } else {
      this.parent.unwrap();
      return super.replaceWith(name, value);
    }
  }
}
DlItem1.blotName = 'dl-item-1';
DlItem1.scope = Parchment.Scope.BLOCK_BLOT;
DlItem1.tagName = ['DD', 'DT'];

// class DlItem2 extends DlItem1 {

// static formats(domNode) {
//   console.log(domNode);
//   return domNode.tagName === DlItem2.tagName ? domNode : undefined;
// }
// }
// DlItem2.blotName = 'dl-item-2';
// DlItem2.scope = Parchment.Scope.BLOCK_BLOT;
// DlItem2.tagName = 'DD';
let index = 0;

class Dl extends Container {
  static create(value) {
    console.log('create')
    const node = super.create();
    return node;
  }

  static formats(domNode) {
    // console.log(domNode);
    index = 0;
    return domNode.tagName === Dl.tagName ? domNode : undefined;
  }

  constructor(props) {
    super(props);
    console.log('constructor');
    this.index = 0;
  }

  optimize(context) {
    console.log('optimize');
    super.optimize(context);
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName) {
      next.moveChildren(this);
      next.remove();
    }
  }

  replace(target) {
    this.index += 1;
    console.log();
    console.log('replace', target, target.next.index);
    console.log('replace', target.domNode);
    // console.log()
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild, index);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
    console.log('replace123', this.index);
  }

  insertBefore(blot, ref) {
    // console.log('insertBefore', blot.domNode)
    // if (blot instanceof DlItem1 || blot instanceof DlItem2) {
    super.insertBefore(blot, ref);
    // } else {
    //   let index = ref == null ? this.length() : ref.offset(this);
    //   let after = this.split(index);
    //   if (!after || !after.parent) { return; }
    //   after.parent.insertBefore(blot, after);
    // }
  }
}
Dl.blotName = 'dl';
Dl.scope = Parchment.Scope.BLOCK_BLOT;
Dl.tagName = 'dl';
Dl.defaultChild = 'dl-item-1';
Dl.allowedChildren = [DlItem1];


// export { Dl as default, DlItem1, DlItem2}
export { Dl as default, DlItem1 }
// export { Dl as default }
