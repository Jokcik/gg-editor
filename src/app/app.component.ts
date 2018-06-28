import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TypeQuill} from './editor/quill-service/quill-register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public value = `
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkadfadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad</p>
    <p>fadfsdglasjfhkjghasjfhjkasdhfkjahsdkjfhsjkdhfkasdhfkjashdkfhakjsdfhkad
    </p>
  `
  public type: TypeQuill = TypeQuill.COMMENT;

  constructor() {
  }

  ngOnInit() {
  }

}
