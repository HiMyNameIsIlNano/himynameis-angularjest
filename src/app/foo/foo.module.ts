import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './component/foo.component';
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    FooComponent
  ],
  exports: [
    FooComponent
  ],
    imports: [
        CommonModule,
        MatGridListModule
    ]
})
export class FooModule { }
