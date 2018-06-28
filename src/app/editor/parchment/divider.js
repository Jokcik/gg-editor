import Quill from 'quill/core';
const BlockEmbed = Quill.import('blots/block/embed');

class Divider extends BlockEmbed { }
Divider.blotName = 'divider';
Divider.tagName = 'HR';

export default Divider;
