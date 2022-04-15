import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './component/foo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FooComponent
  ],
  exports: [
    FooComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule
  ]
})
export class FooModule {
}
