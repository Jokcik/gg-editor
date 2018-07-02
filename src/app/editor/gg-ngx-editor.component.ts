import {Store} from '@ngrx/store';
import {AfterViewInit, ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {QuillService} from './quill-service/quill.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TypeQuill} from './quill-service/register/quill-register';
import {Observable, of} from 'rxjs';
import {SelectionEditor} from './models';
import {EditorState} from './store/reducers/editor';
import {getSelection} from './store/reducers';

@Component({
  selector: 'gg-editor',
  templateUrl: './gg-ngx-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GGNgxEditorComponent implements OnInit, AfterViewInit {
  @Input() value: string;
  @Input() type: TypeQuill;

  public toggleSmiles: boolean;
  public toggleImageUpload: boolean;

  public editor$: Observable<SelectionEditor> = of(new SelectionEditor());
  public editor: SelectionEditor = new SelectionEditor();

  constructor(private quillService: QuillService,
              private store: Store<EditorState>,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private appRef: ApplicationRef,
              private sanitaizer: DomSanitizer) {
    this.editor$.subscribe(a => {
    //   this.editor = new SelectionEditor();
    //   console.log(this.editor);
      this.editor = { ...a };
      console.trace(a);
      this.appRef.tick()
    });
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
    this.zone.run(() => {
      this.editor$ = this.store.select(getSelection);
    });
  }

  public ngAfterViewInit() {
    this.quillService.init(this.type);
    const delta = this.quillService.convertHTML(this.value);
    this.quillService.setContent(delta);
  }
}
