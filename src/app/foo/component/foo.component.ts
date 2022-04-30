import { Component, OnInit } from '@angular/core';
import { FooService } from '../service/foo.service';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  private _randomCatFact: {
    fact: string,
    length: number
  } = {fact: '', length: 0};

  constructor(private service: FooService) {
  }

  ngOnInit(): void {
    this.service.getSomeData()
      .subscribe(fact => {
        this._randomCatFact = fact;
      });
  }

  get fact() {
    return this._randomCatFact.fact;
  }

}
