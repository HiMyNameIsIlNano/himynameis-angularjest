import { TestBed } from '@angular/core/testing';
import { CatFactResponse, CatFactsService } from './cat-facts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CAT_FACTS_URL } from '../../init/init.module';
import { HttpClient } from '@angular/common/http';

describe('FooService with TestBed', () => {

  let mockController: HttpTestingController;
  let httpClient: HttpClient;
  let serviceUnderTest: CatFactsService;
  let dummyCatFact: CatFactResponse = new CatFactResponse('dunno', 5);
  let expectedFact: CatFactResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: CAT_FACTS_URL, useValue: 'dummy'},
        CatFactsService
      ]
    }).compileComponents();

    mockController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    serviceUnderTest = TestBed.inject(CatFactsService);
  });

  test('should create service', () => {
    expect(serviceUnderTest).not.toBeUndefined();
  });

  test('should return dummy cat fact', () => {
    let noError = undefined;

    serviceUnderTest.getSomeFactOnCats().subscribe({
        next: (fact: CatFactResponse) => expectedFact = fact,
        error: error => noError = error,
      }
    );

    const request = mockController.expectOne('dummy');
    request.flush(dummyCatFact);

    expect(expectedFact.text).toEqual('dunno');
    expect(noError).toBeUndefined();
  });

});
