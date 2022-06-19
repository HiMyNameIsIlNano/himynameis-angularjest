import { Component, OnInit } from '@angular/core';
import { RandomTextService } from './init/random-text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private titleText = 'Angular Jest Test Project';

  private someRandomText = 'Dummy Value';

  constructor(private randomTextGenerator: RandomTextService) {
  }

  ngOnInit(): void {
    this.randomTextGenerator.observeTextGenerator.subscribe(
      text => this.someRandomText = text
    );
  }

  get title(): string {
    return this.titleText;
  }

  get randomText(): string {
    return this.someRandomText;
  }
}
