import {Blockquote, Cite, Del, H1, H2, H3, Ins} from './blocks';

export class SelectionEditor {
  active: boolean = false;
  activeLink: boolean = false;
  activeBold: boolean = false;
  activeItalic: boolean = false;

  h1: H1 = new H1();
  h2: H2 = new H2();
  h3: H3 = new H3();
  blockquote: H3 = new Blockquote();
  cite: Cite = new Cite();
  del: Del = new Del();
  ins: Ins = new Ins();
}
