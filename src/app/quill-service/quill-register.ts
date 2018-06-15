import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
// import Image from 'quill/formats/image';
import Delete from '../parchment/del';
import Ins from '../parchment/ins';
import Divider from '../parchment/divider';
import Image from '../parchment/image';
import Spoiler from '../parchment/spoiler';

export function registerQuill(Quill: any) {
  Quill.register({
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/delete': Delete,
    'formats/ins': Ins,
    'formats/divider': Divider,
    'formats/image': Image,
    'formats/spoiler': Spoiler,
  }, true)
}
