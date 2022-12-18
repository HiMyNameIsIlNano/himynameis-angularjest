import { Injectable } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { BazMockService } from './baz-mock.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class BazService {

  constructor(private service: BazMockService, private logger: LoggerService) {
  }

  getSomeData() {
    return this.service.getMockedData()
      .pipe(
        tap(value => this.logger.info('received: ', value)),
        catchError(() => {
          debugger
          this.logger.error('something went wrong');
          return EMPTY;
        })
      );
  }
}
