import { Component } from '@angular/core';
import { RandomTextService } from './init/random-text.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private titleText = 'Angular Jest Test Project';

  readonly observeTextGenerator: Observable<string>;

  constructor(private randomTextGenerator: RandomTextService) {
    this.observeTextGenerator = this.randomTextGenerator.observeTextGenerator;
  }

  get title(): string {
    return this.titleText;
  }
}
