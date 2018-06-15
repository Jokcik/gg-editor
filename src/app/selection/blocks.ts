export class Tag {
  active: boolean = false;

  constructor(active: boolean = false) {
    this.active = active;
  }
}

export class H1 extends Tag{
  check: boolean = false;
}

export class H2 extends Tag {
}

export class H3 extends Tag {
}

export class Cite extends Tag {
}


export class Dd extends Tag {
}

export class Dt extends Tag {
}

export class OrderedList extends Tag {
}

export class UnorderedList extends Tag {
}

export class Blockquote extends Tag {
}

export class Img extends Tag {
  static TagName = 'image';
  static createByFormat(format: any) {
    return new Link(!!format[this.TagName]);
  }
}

export class Link extends Tag {
  static TagName = 'link';
  static createByFormat(format: any) {
    return new Link(!!format[this.TagName]);
  }
}

export class Divider extends Tag {
  static TagName = 'divider';
  static createByFormat(format: any) {
    return new Divider(!!format[this.TagName]);
  }
}

export class Ins extends Tag {
  static TagName = 'ins';
  static createByFormat(format: any) {
    return new Del(!!format[this.TagName]);
  }
}

export class Del extends Tag {
  static TagName = 'delete';
  static createByFormat(format: any) {
    return new Del(!!format[this.TagName]);
  }
}

export class Bold extends Tag {
  static TagName = 'bold';
  static createByFormat(format: any) {
    return new Bold(!!format[this.TagName]);
  }
}


export class Italic extends Tag {
  static TagName = 'italic';
  static createByFormat(format: any) {
    return new Italic(!!format[this.TagName]);
  }
}
