import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_FACTS_URL } from '../../init/init.module';

export interface CatFactResponse {

  readonly factText: string;
  readonly  factLengthInLetters: number;

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
