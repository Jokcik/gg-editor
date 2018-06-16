import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import Header from 'quill/formats/header';
import Blockquote from 'quill/formats/blockquote';
import List, { ListItem } from 'quill/formats/list';
import Image from 'quill/formats/image';
import Delete from '../parchment/del';
import Ins from '../parchment/ins';
import Divider from '../parchment/divider';
import Spoiler from '../parchment/spoiler';
import Q from '../parchment/q';
import Cite, {CiteItem} from '../parchment/cite';

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
    'formats/header': Header,
    'formats/blockquote': Blockquote,
    'formats/list': List,
    'formats/list/item': ListItem,
    'formats/cite': Cite,
    'formats/cite/item': Link,
    'formats/q': Q,
  }, true)
}
