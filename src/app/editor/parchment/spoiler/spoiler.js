import SpoilerBlock from './spoiler-block';
import Container from 'quill/blots/container';
import Block from 'quill/blots/block';
import Parchment from 'parchment';
import SpoilerHeader from "./spoiler-head";
import SpoilerContent from "./spoiler-content";

class Spoiler extends Container {
  static create(value) {
    // console.log(value);
    let node = super.create();

    const a = Parchment.create('spoiler-block', value);

    node.appendChild(a.domNode);

    return node;
  }

  // insertBefore(blot, ref) {
  //   console.warn(blot, ref);
  //   if (!(blot instanceof SpoilerBlock)) {
  //     super.insertBefore(blot, ref);
  //   } else {
  //     // console.log('insertBefore(blot, ref)', blot, ref);
  //     let index = ref == null ? this.length() : ref.offset(this);
  //     let after = this.split(index);
  //     if (!after || !after.parent) { return; }
  //     after.parent.insertBefore(blot, after);
  //   }
  // }

  // insertAt() {
  //   console.warn('insertAt()', ...arguments);
  // }

  // optimize() {
  //
  // }
}

Spoiler.blotName = 'spoiler';
Spoiler.scope = Parchment.Scope.BLOCK_BLOT;
Spoiler.tagName = 'gg-spoiler-editor';

export default Spoiler;
