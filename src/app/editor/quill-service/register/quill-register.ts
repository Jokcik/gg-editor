import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import Image from 'quill/formats/image';
import Video from 'quill/formats/video';
import List, {ListItem} from 'quill/formats/list';
import Underline from 'quill/formats/underline';
import Delete from '../../parchment/del';
import Spoiler from '../../parchment/spoiler';
import CommentHeader from '../../parchment/header';
import Br from '../../parchment/break';
import Blockquote from '../../parchment/blockquote';
import BreakLine from '../../parchment/break';
import Clip from '../../parchment/clip';


export enum TypeQuill {
  COMMENT
}

export function registerQuill(Quill: any, type: TypeQuill) {
  switch (type) {
    case TypeQuill.COMMENT:
      registerComments(Quill);
      break;
    default:
      break;
  }
}

function registerComments(Quill: any) {
  Quill.register('modules/clipboard', Clip);
  Quill.register({
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/delete': Delete,
    'formats/image': Image,
    'formats/spoiler': Spoiler,
    'formats/header': CommentHeader,
    'formats/underline': Underline,
    'formats/break': Br,
    'formats/blockquote': Blockquote,

    'formats/list': List,
    'formats/video': Video,
    'formats/list/item': ListItem,

    'blots/breakLine': BreakLine
  })
}

//Quill.register({
//     'formats/bold': Bold,
//     'formats/italic': Italic,
//     'formats/link': Link,
//     'formats/delete': Delete,
//     'formats/ins': Ins,
//     'formats/divider': Divider,
//     'formats/image': Image,
//     'formats/spoiler': Spoiler,
//     'formats/header': Header,
//     'formats/blockquote': Blockquote,
//     'formats/list': List,
//     'formats/list/item': ListItem,
//     'formats/cite': Cite,
//     'formats/q': Q,
//   })
