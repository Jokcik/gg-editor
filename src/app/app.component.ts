import {Component, OnInit, Renderer2} from '@angular/core';
import {SelectionService} from './selection';
import {CommandService} from './command/command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public show: boolean = false;
  public text: string;
  public active: boolean;
  public activeBold: boolean;
  public activeItalic: boolean;

  public objActive: {[key: string]: boolean} = {
    header: false,
    subheader: false,
    quote: false
  };

  constructor(private selectionService: SelectionService,
              private commandService: CommandService) {
  }

  ngOnInit() {
    this.selectionService.selected$.subscribe(result => {
      this.show = result.active;
      this.active = result.activeLink;
      this.activeBold = result.activeBold;
      this.activeItalic = result.activeItalic;
    })
  }

  bold() {
    this.commandService.bold();
  }

  italic() {
    this.commandService.italic();
  }

  addLink() {
    const url = 'example.com';
    this.commandService.createLink(url);
  }

  unlink() {
    this.commandService.unLink();
  }

  private formatBlock(block: string) {
    document.execCommand('formatBlock', true, block);
    this.selectionService.checkActive();
  }

  formatBlockH3() {
    if (this.objActive.header) {
      this.formatBlock('p');
    } else {
      this.formatBlock('h3');
    }
    this.toogle('header');
  }


  formatBlockH4() {
    if (this.objActive.subheader) {
      this.formatBlock('p');
    } else {
      this.formatBlock('h4');
    }
    this.toogle('subheader');
  }


  formatBlockquote() {
    if (this.objActive.quote) {
      this.formatBlock('p');
    } else {
      this.formatBlock('BLOCKQUOTE');
    }

    this.toogle('quote');
  }

  toogle(block: string) {
    const res = this.objActive[block];
    console.log(this.objActive);
    Object.keys(this.objActive).forEach(key => this.objActive[key] = false);
    console.log(this.objActive);
    this.objActive[block] = !res;
  }

  upload() {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = () => {
      const fileList = input.files;
      const url = URL.createObjectURL(fileList.item(0));
      const img = document.createElement('img');
      img.setAttribute('src', url);
      document.body.querySelector('.ql-editor').appendChild(img)
      // document.execCommand('insertImage', true, url);
    }
  }
}
