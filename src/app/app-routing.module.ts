import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooComponent } from './foo/component/foo.component';

const routes: Routes = [
  {path: '', component: FooComponent, pathMatch: 'full'},
  {path: 'foo', component: FooComponent},
  {path: '**', component: FooComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
