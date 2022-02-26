import { Component } from '@angular/core';
import {Foo} from "./foo/types/foo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular Jest Test Project';
  aFoo: Foo = {
    id: 1,
    name: 'Me'
  }
}
