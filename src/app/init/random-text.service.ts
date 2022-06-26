import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomTextService {

  private readonly textGenerator$: Observable<string> = of('No value');

  constructor() {
    this.textGenerator$ = new Observable<string>(observer => {
      setTimeout(() => observer.next(new Date().toString()), 2000);
    });
  }

  get observeTextGenerator(): Observable<string> {
    return this.textGenerator$;
  }
}
