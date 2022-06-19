import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomTextService {

  private readonly textGenerator$: Observable<string>;

  constructor() {
    this.textGenerator$ = setTimeout(() => {
    }, 2000);
  }


  get observeTextGenerator(): Observable<string> {
    return this.textGenerator$;
  }
}
