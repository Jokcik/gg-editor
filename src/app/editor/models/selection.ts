import {Blockquote, Bold, Cite, Del, H1, H2, H3, Ins, Link, OrderedList, Underline, UnorderedList} from './blocks';

export class SelectionEditor {
  active: boolean = false;
  bold: Bold = new Bold();
  italic: Bold = new Bold();

  h1: H1 = new H1();
  h2: H2 = new H2();
  h3: H3 = new H3();
  blockquote: H3 = new Blockquote();
  cite: Cite = new Cite();
  del: Del = new Del();
  ins: Ins = new Ins();
  under: Underline = new Underline();
  link: Link = new Link();
  orderedList: OrderedList = new OrderedList();
  unorderedList: UnorderedList = new UnorderedList();
}
