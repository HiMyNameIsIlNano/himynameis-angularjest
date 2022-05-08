import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FooModule } from './foo/foo.module';
import { CAT_FACTS_URL, InitModule } from './init/init.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FooModule,
    MatSliderModule,
    InitModule
  ],
  providers: [{
    provide: CAT_FACTS_URL,
    useFactory: () => InitModule.API_URL
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
