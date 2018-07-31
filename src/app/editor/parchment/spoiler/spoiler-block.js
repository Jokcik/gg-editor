import SpoilerContent from './spoiler-content';
import Container from 'quill/blots/container';
import Parchment from 'parchment';
import SpoilerHeader from "./spoiler-head";

class SpoilerBlock extends Container {
  static create(value) {
    console.log('create SpoilerBlock', value);
    let node = super.create();
    node.classList.add('active');

    // const head = document.createElement('div');
    // head.classList.add('spoiler-head');
    // head.innerHTML = '123';

    const head = Parchment.create('spoiler-header', value.title);

    // const content = document.createElement('div');
    // content.classList.add('spoiler-content');
    // content.innerHTML = 'text';
    const content = Parchment.create('spoiler-content', value.text);

    node.appendChild(head.domNode);
    node.appendChild(content.domNode);

    return node;
  }
  //
  //
  // insertBefore(blot, ref) {
  //   if (blot instanceof SpoilerContent || blot instanceof SpoilerHeader) {
  //     super.insertBefore(blot, ref);
  //   } else {
  //     // console.log('insertBefore(blot, ref)', blot, ref);
  //     let index = ref == null ? this.length() : ref.offset(this);
  //     let after = this.split(index);
  //     if (!after || !after.parent) { return; }
  //     after.parent.insertBefore(blot, after);
  //   }
  // }
  //
  // replace(target) {
  //   if (target.statics.blotName !== this.statics.blotName) {
  //     let item = Parchment.create(this.statics.defaultChild);
  //     target.moveChildren(item);
  //     this.appendChild(item);
  //   }
  //   super.replace(target);
  // }
  //
  // optimize() {
  //   super.optimize();
  //   let next = this.next;
  //   if (next != null && next.prev === this &&
  //     next.statics.blotName === this.statics.blotName &&
  //     next.domNode.tagName === this.domNode.tagName) {
  //     next.moveChildren(this);
  //     next.remove();
  //   }
  // }
}
SpoilerBlock.blotName = 'spoiler-block';
SpoilerBlock.tagName = 'div';
SpoilerBlock.scope = Parchment.Scope.BLOCK_BLOT;
SpoilerBlock.className = 'spoiler-block';

export default SpoilerBlock;
