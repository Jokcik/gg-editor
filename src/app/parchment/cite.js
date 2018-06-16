import Delta from 'quill-delta';
import Parchment from 'parchment';
import Block from 'quill/blots/block';
import Container from 'quill/blots/container';
// import Inline from 'quill/blots/inline';
import Link from 'quill/formats/link';

class CiteItem extends Link {
  // static create(value) {
  //   console.log(value);
  // }
}
CiteItem.blotName = 'cite-item';
CiteItem.tagName = 'A';


class Cite extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute('contenteditable', false);
    if (value.url) {
      const a = CiteItem.create(value.url);
      a.innerHTML = value;
      a.setAttribute('contenteditable', true);
      node.appendChild(a);
    } else {
      node.innerHTML = value;
    }

    return node;
  }

  static formats(domNode) {
    return domNode.tagName === Cite.tagName ? domNode.innerHTML : undefined;
  }

  constructor(domNode) {
    super(domNode);
    const listEventHandler = (e) => {

      switch (e.keyCode) {
        case 13:
          console.log(123);
          e.preventDefault();
          const next = this.next;
          const parent = this.parent;
          let item = Parchment.create('block');
          item.insertInto(parent, next);
      }
    };

    const a = domNode.querySelector('a');
    if (a) {
      a.setAttribute('contenteditable', true)
    }
    domNode.addEventListener('keydown', listEventHandler);
  }

  // remove() {
  // console.log(123);
  // }
  // delta() {
  //   let text = this.domNode.textContent;
  //   if (text.endsWith('\n')) {      // Should always be true
  //     text = text.slice(0, -1);
  //   }
  //   return text.split('\n').reduce((delta, frag) => {
  //     return delta.insert(frag).insert('\n', this.formats());
  //   }, new Delta());
  // }
  //
  // format(name, value) {
  //   if (name === this.statics.blotName && value) return;
  //   let [text, ] = this.descendant(TextBlot, this.length() - 1);
  //   if (text != null) {
  //     text.deleteAt(text.length() - 1, 1);
  //   }
  //   super.format(name, value);
  // }
  //
  // formatAt(index, length, name, value) {
  //   if (length === 0) return;
  //   if (Parchment.query(name, Parchment.Scope.BLOCK) == null ||
  //     (name === this.statics.blotName && value === this.statics.formats(this.domNode))) {
  //     return;
  //   }
  //   let nextNewline = this.newlineIndex(index);
  //   if (nextNewline < 0 || nextNewline >= index + length) return;
  //   let prevNewline = this.newlineIndex(index, true) + 1;
  //   let isolateLength = nextNewline - prevNewline + 1;
  //   let blot = this.isolate(prevNewline, isolateLength);
  //   let next = blot.next;
  //   blot.format(name, value);
  //   if (next instanceof CodeBlock) {
  //     next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
  //   }
  // }

  // optimize(context) {
  //   if (!this.domNode.textContent.endsWith('\n')) {
  //     this.appendChild(Parchment.create('text', '\n'));
  //   }
  //   super.optimize(context);
  //   let next = this.next;
  //   if (next != null && next.prev === this &&
  //     next.statics.blotName === this.statics.blotName &&
  //     this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
  //     next.optimize(context);
  //     // next.moveChildren(this);
  //     next.remove();
  //   }
  // }

  // replace(target) {
  //   super.replace(target);
  //   [].slice.call(this.domNode.querySelectorAll('*')).forEach(function(node) {
  //     let blot = Parchment.find(node);
  //     if (blot == null) {
  //       node.parentNode.removeChild(node);
  //     } else if (blot instanceof Parchment.Embed) {
  //       blot.remove();
  //     } else {
  //       // blot.unwrap();
  //     }
  //   });
  // }

  length() {
    let length = this.domNode.textContent.length;
    if (!this.domNode.textContent.endsWith('\n')) {
      return length + 1;
    }
    return length;
  }

  // newlineIndex(searchIndex, reverse = false) {
  //   if (!reverse) {
  //     let offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
  //     return offset > -1 ? searchIndex + offset : -1;
  //   } else {
  //     return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
  //   }
  // }

  insertBefore(blot, ref) {
    // super.insertBefore(blot, ref)
  }
}
Cite.blotName = 'cite';
Cite.scope = Parchment.Scope.BLOCK_BLOT;
Cite.tagName = 'cite';
Cite.defaultChild = 'link';
Cite.allowedChildren = [Link];


export { Cite as default, CiteItem }
