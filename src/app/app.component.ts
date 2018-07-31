import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TypeQuill} from './editor/quill-service/register/quill-register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public value = `
    <gg-spoiler-editor title="title" active="true">
      <!--<div class="spoiler-block">-->
        <!--<div class="spoiler-head">asdfasd></div>-->
        <!--<div class="spoiler-content">11111111></div>-->
      <!--</div>-->
      <p>азазаза</p>
    </gg-spoiler-editor>
    <!--<p>аываываfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>-->
    <!--<p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>-->
    <!--<p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>-->
    <!--<p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>-->
<!--123-->
`

  ;
  public type: TypeQuill = TypeQuill.COMMENT;

  constructor() {
  }

  ngOnInit() {
  }

}
