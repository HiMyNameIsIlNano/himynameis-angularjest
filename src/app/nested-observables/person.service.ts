import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly findNameById: (id: number) => Observable<string>;

  constructor() {
    this.findNameById = (id: number) => of(`Dummy, John (${id})`).pipe(delay(1000));
  }
}
