import { TestBed } from '@angular/core/testing';

import { FooService } from './foo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FooService', () => {

  let service: FooService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FooService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

});
