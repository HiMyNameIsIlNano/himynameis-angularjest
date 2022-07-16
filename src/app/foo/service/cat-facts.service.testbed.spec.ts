import { TestBed } from '@angular/core/testing';
import { CatFactResponse, CatFactsService } from './cat-facts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CAT_FACTS_URL } from '../../init/init.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('FooService with TestBed', () => {

  let mockController: HttpTestingController;
  let httpClient: HttpClient;
  let serviceUnderTest: CatFactsService;
  let dummyCatFact: CatFactResponse = {
    factText: 'dunno',
    factLengthInLetters: 5
  };

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
    let expectedCatFact: CatFactResponse | undefined = undefined;

    serviceUnderTest.getSomeFactOnCats().subscribe({
        next: fact => expectedCatFact = fact,
        error: () => fail('Error should have not been called'),
        complete: () => fail('Complete should have not been called'),
      }
    );

    const request = mockController.expectOne('dummy');
    request.flush(dummyCatFact);

    expect(expectedCatFact).not.toBeUndefined();
    expect(expectedCatFact!.factText).toEqual('dunno');

    mockController.verify();
  });

  test('should return error', () => {
    let returnedError: HttpErrorResponse | undefined = undefined;

    const errorEvent = new ProgressEvent('Something went wrong');
    const status = 500;
    const statusText = 'Internal server error';

    serviceUnderTest.getSomeFactOnCats().subscribe({
        next: () => fail('Next should have not been called'),
        error: error => returnedError = error,
        complete: () => fail('Complete should have not been called')
      }
    );

    const request = mockController.expectOne('dummy');
    request.error(errorEvent, {
      status: status,
      statusText: statusText
    });

    expect(returnedError).not.toBeUndefined();
    expect(returnedError!.error).toEqual(new ProgressEvent('Something went wrong'));
    expect(returnedError!.status).toBe(500);
    expect(returnedError!.statusText).toBe('Internal server error');
  });

});
