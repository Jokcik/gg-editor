import {Blockquote, Bold, Cite, Dd, Del, Dt, H1, H2, H3, Ins, Link, OrderedList, UnorderedList} from './blocks';

export class SelectionEditor {
  active: boolean = false;
  // activeLink: boolean = false;
  // activeBold: boolean = false;
  bold: Bold = new Bold();
  italic: Bold = new Bold();

  // h1: H1 = new H1();
  // h2: H2 = new H2();
  // h3: H3 = new H3();
  // blockquote: H3 = new Blockquote();
  // cite: Cite = new Cite();
  del: Del = new Del();
  ins: Ins = new Ins();
  link: Link = new Link();
  // dd: Dd = new Dd();
  // dt: Dt = new Dt();
  // orderedList: OrderedList = new OrderedList();
  // unorderedList: UnorderedList = new UnorderedList();
}
