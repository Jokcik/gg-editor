import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {SelectionService} from './selection';
import {CommonModule} from '@angular/common';
import {CommandService} from './command';
import {SelectionLogicService} from './selection/selection-logic.service';
import { TestComponent } from './test/test.component';
import {createCustomElement} from '@angular/elements';
import {GGSpoilerComponent} from './gg-spoiler';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    GGSpoilerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [
    GGSpoilerComponent
  ],
  providers: [SelectionService, CommandService, SelectionLogicService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customSpoiler = createCustomElement(GGSpoilerComponent, { injector: this.injector });
    customElements.define('gg-spoiler', customSpoiler);
  }

}
