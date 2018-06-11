import {H1} from './h1';
import {H2} from './h2';
import {H3} from './h3';
import {Blockquote} from './blockquote';

export class SelectionEditor {
  active: boolean = false;
  activeLink: boolean = false;
  activeBold: boolean = false;
  activeItalic: boolean = false;

  h1: H1 = new H1();
  h2: H2 = new H2();
  h3: H3 = new H3();
  blockquote: H3 = new Blockquote();
}
