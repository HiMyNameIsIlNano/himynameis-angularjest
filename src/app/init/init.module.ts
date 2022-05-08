import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';

export const CAT_FACTS_URL = new InjectionToken<string>('apiUrl');

function loadApiUrl(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get<any>(environment.configUrl)
    .pipe(map(response => response['url']))
    .pipe(tap(url => InitModule.API_URL = url));
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers: [{
    provide: APP_INITIALIZER,
    useFactory: loadApiUrl,
    multi: true,
    deps: [HttpClient]
  }
  ]
})
export class InitModule {

  static API_URL: string;

}
