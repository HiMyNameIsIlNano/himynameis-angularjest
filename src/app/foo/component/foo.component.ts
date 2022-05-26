import { Component, OnInit } from '@angular/core';
import { CatFactResponse, CatFactsService } from '../service/cat-facts.service';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  private _randomCatFact: CatFactResponse = new CatFactResponse('', 0);

  constructor(private service: CatFactsService) {
  }

  get fact() {
    return this._randomCatFact.text;
  }

  ngOnInit(): void {
    this.service.getSomeFactOnCats()
      .subscribe((fact: CatFactResponse) => {
        this._randomCatFact = fact;
      });
  }

}
