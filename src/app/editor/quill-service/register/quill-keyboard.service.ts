import {Injectable} from '@angular/core';
import Quill from 'quill/core';
import Parchment from 'parchment';
import {QuillService} from '../quill.service';
const Delta = Quill.import("delta");

@Injectable()
export class QuillKeyboardService {

  constructor() {
  }

  public getMatchers() {
    return [
      ['GG-SPOILER-EDITOR', this.spoilerMatcher],
      ['BR', this.lineBreakMatcher],
    ]
  }

  public getBinging(service: QuillService) {
    return {
      enter: {
        key: 13,
        handler: (range, context) => this.handlerEnter(service, range, context)
      },

      linebreak: {
        key: 13,
        shiftKey: true,
        handler: (range, context) => this.handlerShiftEnter(service, range, context)
      },


      // onPaste: {
      //   key: 'V',
      //   shortKey: true,
      //   handler: function(range, context, f) {
      //     console.log('ONPASTE', range, context, f);
      //   }
      // },
    };
  }

  private lineBreakMatcher() {
    const newDelta = new Delta();
    newDelta.insert({'breakLine': ''});
    return newDelta;
  }

  private spoilerMatcher(a) {
    if (!a) { return new Delta(); }
    const newDelta = new Delta();
    console.log(a);
    newDelta.insert({'spoiler': {text: a.innerHTML, title: a.getAttribute('title')}});
    return newDelta;
  }

  private handlerShiftEnter(service: QuillService, range, context) {
      const previousChar = service._quill.getText(range.index - 1, 1);
      if (previousChar == '\n') {
        service._quill.deleteText(range.index - 1, 1);
        const lineFormats = Object.keys(context.format).reduce(function(lineFormats, format) {
          if (Parchment.query(format, Parchment.Scope.BLOCK) && !Array.isArray(context.format[format])) {
            lineFormats[format] = context.format[format];
          }
          return lineFormats;
        }, {});
        service._quill.insertText(range.index - 1, '\n', lineFormats, Quill.sources.USER);
        service._quill.setSelection(range.index, Quill.sources.SILENT);
        return;
      }

      const nextChar = service._quill.getText(range.index + 1, 1);
      service._quill.insertEmbed(range.index, 'breakLine', true, 'user');

      if (nextChar.length == 0) {
        // second line break inserts only at the end of parent element
        service._quill.insertEmbed(range.index, 'breakLine', true, 'user');
      }
      service._quill.setSelection(range.index + 1, Quill.sources.SILENT);
  }

  private handlerEnter(service: QuillService, range, context) {
    if (range.length > 0) {
      service._quill.scroll.deleteAt(range.index, range.length);  // So we do not trigger text-change
    }
    const lineFormats = Object.keys(context.format).reduce(function(lineFormats, format) {
      if (Parchment.query(format, Parchment.Scope.BLOCK) && !Array.isArray(context.format[format])) {
        lineFormats[format] = context.format[format];
      }
      return lineFormats;
    }, {});
    const previousChar = service._quill.getText(range.index - 1, 1);
    service._quill.insertText(range.index, '\n', lineFormats, Quill.sources.USER);
    if (previousChar == '' || previousChar == '\n') {
      service._quill.setSelection(range.index + 2, Quill.sources.SILENT);
    } else {
      service._quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
    // service._quill.selection.scrollIntoView();
    Object.keys(context.format).forEach((name) => {
      if (lineFormats[name] != null) return;
      if (Array.isArray(context.format[name])) return;
      if (name === 'link') return;
      service._quill.format(name, context.format[name], Quill.sources.USER);
    });
  }
}
