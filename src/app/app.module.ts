import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { TestComponent } from './test/test.component';
import {createCustomElement} from '@angular/elements';
import {GGSpoilerComponent} from './gg-spoiler';
import {GGNgxEditorModule} from './editor/gg-ngx-editor.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    GGSpoilerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    GGNgxEditorModule
  ],
  entryComponents: [
    GGSpoilerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customSpoiler = createCustomElement(GGSpoilerComponent, { injector: this.injector });
    customElements.define('gg-spoiler', customSpoiler);
  }

}
