import Block from 'quill/blots/block';
import Parchment from 'parchment';

class SpoilerHeader extends Block {
  static create(value) {
    let node = super.create();
    node.innerHTML = value;
    console.log(value, node);
    return node;
  }
}
SpoilerHeader.blotName = 'spoiler-header';
SpoilerHeader.scope = Parchment.Scope.BLOCK_BLOT;
SpoilerHeader.tagName = 'div';
SpoilerHeader.className = 'spoiler-head';

export default SpoilerHeader;
