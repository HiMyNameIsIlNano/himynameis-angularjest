import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  readonly findNameById: (id: number) => Observable<string>;

  constructor() {
    this.findNameById = (id) => of('Branch_' + id).pipe(delay(1000));
  }

}
