import Block from 'quill/blots/block';
import Parchment from 'parchment';
import SpoilerContent from "./spoiler-content";
// import SpoilerBlock from "./spoiler-block";

class SpoilerHeader extends Block {
  static create(value) {
    console.log('SpoilerHeader', value);
    let node = super.create();
    node.innerHTML = value;
    console.log(value, node);
    return node;
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

  static formats(dom) {
    console.log('FORMAT', dom, dom.innerHTML);
    return dom.innerHTML;
    // if (name === SpoilerBlock.blotName && !value) {
    //   this.replaceWith(Parchment.create(this.statics.scope));
    // } else {
    //   super.format(name, value);
    // }
  }

  // remove() {
  //   if (this.prev == null && this.next == null) {
  //     this.parent.remove();
  //   } else {
  //     super.remove();
  //   }
  // }

  insertBefore(blot, ref) {
    if (!blot) { return; }
    console.log(blot, ref);
    // if (blot instanceof SpoilerContent || blot instanceof SpoilerHeader) {
      super.insertBefore(blot, ref);
    // } else {
    //   console.log('insertBefore(blot, ref)', blot, ref);
    //   let index = ref == null ? this.length() : ref.offset(this);
    //   let after = this.split(index);
    //   if (!after || !after.parent) { return; }
    //   after.parent.insertBefore(blot, after);
    // }
  }
}
SpoilerHeader.blotName = 'spoiler-header';
SpoilerHeader.scope = Parchment.Scope.BLOCK_BLOT;
SpoilerHeader.tagName = 'div';
SpoilerHeader.className = 'spoiler-head';

export default SpoilerHeader;
