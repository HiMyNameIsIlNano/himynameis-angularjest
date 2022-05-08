import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_FACTS_URL } from '../../init/init.module';

@Injectable({
  providedIn: 'root'
})
export class FooService {

  constructor(@Inject(CAT_FACTS_URL) private url: string, private client: HttpClient) {
  }

  getSomeData() {
    return this.client.get<{
      fact: string,
      length: number
    }>(this.url);
  }
}
