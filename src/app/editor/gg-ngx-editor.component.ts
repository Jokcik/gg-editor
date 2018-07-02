import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderedList, SelectionEditor, UnorderedList} from './selection';
import {QuillService} from './quill-service/quill.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TypeQuill} from './quill-service/register/quill-register';

@Component({
  selector: 'gg-editor',
  templateUrl: './gg-ngx-editor.component.html',
})
export class GGNgxEditorComponent implements OnInit, AfterViewInit {
  @Input() value: string;
  @Input() type: TypeQuill;

  public safeHtml;
  public toggleSmiles: boolean;
  public toggleImageUpload: boolean;

  constructor(private quillService: QuillService,
              private sanitaizer: DomSanitizer) {
  }

  public getContent(): string {
    const root = <HTMLElement>this.quillService.rootElem.cloneNode(true);
    let spoilers = <any>root.querySelectorAll('gg-spoiler');

    spoilers.forEach(spoiler => this.replaceSpoiler(spoiler));

    return root.innerHTML;
  }

  public img() {
    const src = 'https://pp.userapi.com/c5661/u89683801/152004832/x_bc58fc33.jpg';
    this.quillService.appendImg(src);
  }

  private replaceSpoiler(spoiler: any) {
    let repl = document.createElement('gg-spoiler');
    repl.setAttribute('title', spoiler.getAttribute('title'));
    if (!spoiler.querySelector('.spoiler-content')) { return; }
    repl.innerHTML = spoiler.querySelector('.spoiler-content').innerHTML;
    spoiler.replaceWith(repl);
  }



  ngOnInit() {
    this.safeHtml = this.sanitaizer.bypassSecurityTrustHtml(this.value);
  }

  public ngAfterViewInit() {
    this.quillService.init(this.type);
    const delta = this.quillService.convertHTML(this.value);
    this.quillService.setContent(delta);
  }
}
