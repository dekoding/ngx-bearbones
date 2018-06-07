import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BearbonesModule } from 'ngx-bearbones';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BearbonesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
