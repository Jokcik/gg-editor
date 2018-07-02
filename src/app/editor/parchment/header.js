import Block from 'quill/blots/block';


class Header extends Block {
  static formats(domNode) {
    // return this.tagName.indexOf(domNode.tagName) + 1;
    return 3;
  }
}
Header.blotName = 'header';
Header.tagName = 'H3';


export default Header;
