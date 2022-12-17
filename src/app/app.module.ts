import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FooModule } from './foo/foo.module';
import { InitModule } from './init/init.module';
import { MenuComponent } from './menu/menu.component';
import { NestedObservablesModule } from './nested-observables/nested-observables.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FooModule,
    MatSliderModule,
    InitModule,
    NestedObservablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
