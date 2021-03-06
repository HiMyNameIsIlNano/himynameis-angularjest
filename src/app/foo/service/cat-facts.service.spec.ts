import { CatFactResponse, CatFactsService } from './cat-facts.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import mocked = jest.mocked;


describe('CatFactsService', () => {
  let serviceUnderTest: CatFactsService;

  let expectedFact: CatFactResponse = {
    factText: 'Some fact on cats',
    factLengthInLetters: 17
  };

  const httpMock = (mocked<Partial<HttpClient>>({
    get: jest.fn().mockReturnValue(of(expectedFact)).mockName('get cat facts')
  }) as HttpClient);

  beforeEach(() => {
    serviceUnderTest = new CatFactsService('dummy', httpMock);
  });

  test('should create', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  test('should retrieve one fact over cats', (done) => {
    serviceUnderTest.getSomeFactOnCats().subscribe(
      (fact: CatFactResponse) => {
        expect(httpMock.get).toHaveBeenCalledWith('dummy');
        expect(fact.factText).toEqual('Some fact on cats');
        expect(fact.factLengthInLetters).toEqual(17);
        done();
      });
  });
});
