import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerModule } from '../logger/logger.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule
  ]
})
export class NestedObservablesModule {

  // Obs
  // |----1----2----3|
  //       |-------------\
  //                 |----D----2----3|
  //                           |--------\
  //                           |----D----E----3|
  //                                          |-------------\
  //                                          |----D----E----F|

}
