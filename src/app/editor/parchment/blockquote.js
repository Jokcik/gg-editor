import Parchment from 'parchment'

class Blockquote extends Parchment.Embed {
  static create(value) {
    let node = super.create(value);

    node.innerHTML = value;
    node.setAttribute('contenteditable', false);
    return node;
  }

  static value(domNode) {
    return domNode.innerHTML;
  }
}
Blockquote.blotName = 'blockquote';
Blockquote.tagName = 'BLOCKQUOTE';

export default Blockquote;
