import { FooService } from './foo.service';
import { of } from 'rxjs';


describe('FooService', () => {
  let serviceUnderTest: FooService;

  let expectedFact: {
    fact: string,
    length: number
  } = {
    fact: 'Some fact on cats',
    length: 17
  };
  const httpMock = {
    get: jest.fn().mockReturnValue(of(expectedFact)).mockName('get cat facts')
  };
  const provide = (mock: any): any => mock;

  beforeEach(() => {
    serviceUnderTest = new FooService(provide(httpMock));
  });

  test('should create', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  test('should retrieve one fact over cats', (done) => {
    const url = 'https://catfact.ninja/fact';

    serviceUnderTest.getSomeData().subscribe(
      fact => {
        expect(httpMock.get).toHaveBeenCalledWith(url);
        expect(fact.fact).toEqual('Some fact on cats');
        expect(fact.length).toEqual(17);
        done();
      });
  });
});
