export class Tag {
  active: boolean = false;

  constructor(active: boolean = false) {
    this.active = active;
  }
}

export class Cite extends Tag {
  static TagName = 'cite';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}


export class OrderedList extends Tag {
  static TagName = 'list';
  static formatType = 'ordered';
  static createByFormat(format: any) {
    return new this(format[this.TagName] === this.formatType);
  }
}

export class UnorderedList extends Tag {
  static TagName = 'list';
  static formatType = 'bullet';
  static createByFormat(format: any) {
    return new this(format[this.TagName] === this.formatType);
  }
}

export class Blockquote extends Tag {
  static TagName = 'blockquote';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Underline extends Tag {
  static TagName = 'underline';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class H1 extends Tag {
  static TagName = 'header';
  static formatType = 1;
  static createByFormat(format: any) {
    return new this(format[this.TagName] === this.formatType);
  }
}

export class H2 extends Tag {
  static TagName = 'header';
  static formatType = 2;
  static createByFormat(format: any) {
    return new this(format[this.TagName] === this.formatType);
  }
}

export class H3 extends Tag {
  static TagName = 'header';
  static formatType = 3;
  static createByFormat(format: any) {
    return new this(format[this.TagName] === this.formatType);
  }
}

export class Img extends Tag {
  static TagName = 'image';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Link extends Tag {
  static TagName = 'link';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Divider extends Tag {
  static TagName = 'divider';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Ins extends Tag {
  static TagName = 'ins';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Del extends Tag {
  static TagName = 'delete';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}

export class Bold extends Tag {
  static TagName = 'bold';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}


export class Italic extends Tag {
  static TagName = 'italic';
  static createByFormat(format: any) {
    return new this(!!format[this.TagName]);
  }
}
