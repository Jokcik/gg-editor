import SpoilerHeader from './spoiler-head';
import SpoilerContent from './spoiler-content';
import Container from 'quill/blots/container';
import Parchment from 'parchment';

class SpoilerBlock extends Container {
  static create(value) {
    console.log('SpoilerBlock', value);
    let node = super.create();

    // const head = document.createElement('div');
    // head.classList.add('spoiler-head');
    // head.innerHTML = ;
    const head = Parchment.create('spoiler-header', value.title);

    // const content = document.createElement('div');
    // content.classList.add('spoiler-content');
    // content.innerHTML = value.text;
    const content = Parchment.create('spoiler-content', value.text);

    node.appendChild(head.domNode);
    node.appendChild(content.domNode);

    console.log(node);

    return node;
  }

  optimize() {

  }

}
SpoilerBlock.blotName = 'spoiler-block';
SpoilerBlock.tagName = 'div';
SpoilerBlock.scope = Parchment.Scope.BLOCK_BLOT;
SpoilerBlock.className = 'spoiler-block';
SpoilerBlock.defaultChild = 'div';

export default SpoilerBlock;
