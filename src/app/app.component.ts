import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TypeQuill} from './editor/quill-service/register/quill-register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public value = `
    <gg-spoiler-editor title="123dasd" active="true">
      <div class="spoiler-block"></div>
    </gg-spoiler-editor>
    
    <p>аываываfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
  `;
  public type: TypeQuill = TypeQuill.COMMENT;

  constructor() {
  }

  ngOnInit() {
  }

}
