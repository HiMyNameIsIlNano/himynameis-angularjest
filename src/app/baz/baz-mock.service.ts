import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PayloadDto {
  id: number,
  name: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class BazMockService {

  constructor() {
  }

  getMockedData(): Observable<PayloadDto[]> {
    return of([
      {
        id: 1,
        name: 'item',
        description: 'itemOne'
      }, {
        id: 2,
        name: 'item',
        description: 'itemTwo'
      }
    ]);
  }
}
