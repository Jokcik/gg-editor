import Block from 'quill/blots/block';


class Header extends Block {
  static formats(domNode) {
    // return this.tagName.indexOf(domNode.tagName) + 1;
    return 2;
  }
}
Header.blotName = 'header';
Header.tagName = 'H2';


export default Header;
