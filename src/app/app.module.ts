import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {SelectionService} from './selection';
import {CommonModule} from '@angular/common';
import {CommandService} from './command';
import {SelectionLogicService} from './selection/selection-logic.service';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  providers: [SelectionService, CommandService, SelectionLogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
