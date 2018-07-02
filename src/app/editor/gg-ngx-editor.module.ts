import {Injector, NgModule} from '@angular/core';
import { GGNgxEditorComponent } from './gg-ngx-editor.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuillService} from './quill-service/quill.service';
import { TooltipComponent } from './tooltip/tooltip.component';
import {QuillKeyboardService} from './quill-service/register/quill-keyboard.service';
import {QuillTooltipService} from './quill-service/register/quill-tooltip.service';
import {StoreModule} from '@ngrx/store';
import {editorReducers} from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot(editorReducers)
  ],
  declarations: [
    GGNgxEditorComponent,
    TooltipComponent,
  ],
  exports: [
    GGNgxEditorComponent
  ],
  providers: [
    QuillService,
    QuillKeyboardService,
    QuillTooltipService
  ]
})
export class GGNgxEditorModule {
}
