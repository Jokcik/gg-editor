import Container from 'quill/blots/container';
import Parchment from 'parchment';

class SpoilerContent extends Container {
  static create(value) {
    let node = super.create();
    node.innerHTML = value;
    return node;
  }

}
SpoilerContent.blotName = 'spoiler-content';
SpoilerContent.tagName = 'div';
SpoilerContent.scope = Parchment.Scope.BLOCK_BLOT;
SpoilerContent.className = 'spoiler-content';
SpoilerContent.defaultChild = 'p';

export default SpoilerContent;
