import Quill from 'quill'
import Delta from 'quill-delta'
import Clipboard from 'quill/modules/clipboard'

class PlainTextClipboard extends Clipboard {
  onPaste (e) {
    // if (e.defaultPrevented || !this.quill.isEnabled()) return;
    // let range = this.quill.getSelection();
    // let delta = new Delta().retain(range.index);
    //
    // if (e && e.clipboardData && e.clipboardData.types && e.clipboardData.getData) {
    //   let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    //   text = this.parseURL(te)
    //
    //   let cleanedText = this.convert(text);
    //
    //   // Stop the data from actually being pasted
    //   e.stopPropagation();
    //   e.preventDefault();
    //
    //   // Process cleaned text
    //   delta = delta.concat(cleanedText).delete(range.length);
    //   this.quill.updateContents(delta, Quill.sources.USER);
    //   // range.length contributes to delta.length()
    //   this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
    //
    //   return false
    // }
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    let range = this.quill.getSelection();
    let delta = new Delta().retain(range.index);
    let scrollTop = this.quill.scrollingContainer.scrollTop;
    this.container.focus();
    this.quill.selection.update(Quill.sources.SILENT);
    setTimeout(() => {
      console.log('setTimeout', this.container.innerHTML);
      this.container.innerHTML = this.parseURL(this.container.innerHTML);
      delta = delta.concat(this.convert()).delete(range.length);
      this.quill.updateContents(delta, Quill.sources.USER);
      // range.length contributes to delta.length()
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
      this.quill.scrollingContainer.scrollTop = scrollTop;
      this.quill.focus();
    }, 1);
  }

  parseURL(text) {
    return text.replace(new RegExp('^((ftp|http|https):\\/\\/([^ ]+))', 'gi'), '<a href="$1" target="_blank">$1</a>')
  }
}

export default PlainTextClipboard;
