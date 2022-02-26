import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './component/foo.component';



@NgModule({
  declarations: [
    FooComponent
  ],
  exports: [
    FooComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FooModule { }
