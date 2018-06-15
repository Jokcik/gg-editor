import {createCustomElement} from '@angular/elements';
import {GGSpoilerComponent} from './gg-spoiler.component';
import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    GGSpoilerComponent
  ],
  entryComponents: [
    GGSpoilerComponent,
  ]
})
export class GgSpoilerModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const customSpoiler = createCustomElement(GGSpoilerComponent, { injector: this.injector });
    customElements.define('gg-spoiler', customSpoiler);
  }
}
