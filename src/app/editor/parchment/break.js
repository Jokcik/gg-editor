import Quill from 'quill/core'
const Break = Quill.import('blots/break');
const Embed = Quill.import('blots/embed');

Break.prototype.insertInto = function(parent, ref) {
  Embed.prototype.insertInto.call(this, parent, ref)
};

Break.prototype.length= function() {
  return 1;
};

Break.prototype.value= function() {
  return '\n';
};

export default Break;
