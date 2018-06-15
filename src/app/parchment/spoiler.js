import Quill from 'quill/core';
const BlockEmbed = Quill.import('blots/block/embed');

class Spoiler extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('title', value.title);
    node.innerHTML = value.value;
    return node;
  }

  static value(node) {
    return {
      title: node.getAttribute('title'),
      value: node.innerHTML
    };
  }
}
Spoiler.blotName = 'spoiler';
Spoiler.tagName = 'gg-spoiler';

export default Spoiler;
