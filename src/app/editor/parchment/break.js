import Quill from 'quill/core'
import Parchment from 'parchment';
const Break = Quill.import('blots/break');
const Embed = Quill.import('blots/embed');

class BleakLine extends Parchment.Embed {
  static value() {
    return undefined;
  }

  insertInto(parent, ref) {
    Embed.prototype.insertInto.call(this, parent, ref);
  }

  optimize(context) {
    super.optimize(context);
    if (this.prev && this.prev.domNode.tagName === 'BR') {
      this.prev.remove();
    }

    if (!this.next && this.prev) {
      const textNode = document.createElement('br');
      this.parent.insertBefore(Parchment.create(textNode), this)
    }
  }

  length() {
    return 1;
  }

  value() {
    return '\n';
  }
}
BleakLine.blotName = 'breakLine';
BleakLine.tagName = 'BR';


export default BleakLine;
