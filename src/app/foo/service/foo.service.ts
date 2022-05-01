import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooService {

  private static readonly API_URL: string = 'https://catfact.ninja/fact';

  constructor(private client: HttpClient) {
  }

  get url(): string {
    return FooService.API_URL;
  }

  getSomeData() {
    return this.client.get<{
      fact: string,
      length: number
    }>(FooService.API_URL);
  }
}
