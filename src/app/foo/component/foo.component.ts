import { Component } from '@angular/core';
import { CatFactResponse, CatFactsService } from '../service/cat-facts.service';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent {

  private _randomCatFact: CatFactResponse = {
    factText: '',
    factLengthInLetters: 0
  };

  constructor(private service: CatFactsService) {
    this.service.getSomeFactOnCats()
      .subscribe((fact: CatFactResponse) => {
        this._randomCatFact = fact;
      });
  }

  get fact() {
    return [this._randomCatFact];
  }

}
