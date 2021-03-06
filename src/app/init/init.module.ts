import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { RandomTextService } from './random-text.service';

export let CAT_FACTS_URL: InjectionToken<string>;

function loadApiUrl(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get<any>(environment.configUrl)
    .pipe(map(response => response['url']))
    .pipe(tap(url => {
        CAT_FACTS_URL = new InjectionToken<string>('apiUrl', {
          providedIn: 'root',
          factory: () => url
        });
      }
    ));
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadApiUrl,
      multi: true,
      deps: [HttpClient]
    },
    RandomTextService
  ]
})
export class InitModule {

}
