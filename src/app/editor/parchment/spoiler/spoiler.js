import SpoilerBlock from './spoiler-block';
import Container from 'quill/blots/container';
import Block from 'quill/blots/block';
import Parchment from 'parchment';
import SpoilerHeader from "./spoiler-head";

console.log(Container);

class Spoiler extends Container {
  static create(value) {
    console.log(value);
    let node = super.create();
    // let node = document.createElement('gg-spoiler-editor');
    // const block = Parchment.create('spoiler-block', value_);
    // const block = document.createElement('div');
    // block.classList.add('spoiler-block');
    // block.classList.add('active');
    const a = Parchment.create('spoiler-block', value);

    console.log(a.domNode);
    node.appendChild(a.domNode);

    return node;
  }


}
Spoiler.blotName = 'spoiler';
Spoiler.scope = Parchment.Scope.BLOCK_BLOT;
Spoiler.defaultChild = 'div';
Spoiler.tagName = 'gg-spoiler-editor';

export default Spoiler;
