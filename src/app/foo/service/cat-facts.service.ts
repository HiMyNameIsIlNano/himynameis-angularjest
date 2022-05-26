import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_FACTS_URL } from '../../init/init.module';

export class CatFactResponse {

  constructor(private factText: string, private factLengthInLetters: number) {
  }

  get text() {
    return this.factText;
  }

  get length() {
    return this.factLengthInLetters;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CatFactsService {

  constructor(@Inject(CAT_FACTS_URL) private url: string, private client: HttpClient) {
  }

  getSomeFactOnCats() {
    return this.client.get<CatFactResponse>(this.url);
  }
}
